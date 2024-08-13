export class IndexedDB {
  private static instance: IndexedDB
  private db: IDBDatabase | null = null
  private dbName: string
  private tableName: string
  private dbVersion: number = 1

  constructor(dbName: string, tableName: string) {
    this.dbName = dbName
    this.tableName = tableName

    if (!IndexedDB.instance) {
      IndexedDB.instance = this
      this.openDatabase().catch(console.error)
    }

    return IndexedDB.instance
  }

  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db)
        return
      }

      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onerror = (event) => {
        console.error('Database error:', (event.target as IDBRequest).error)
        reject((event.target as IDBRequest).error)
      }

      request.onsuccess = (event) => {
        this.db = (event.target as IDBRequest).result
        if (this.db) {
          console.log(`Database '${this.dbName}' opened successfully`)
          resolve(this.db)
        } else {
          reject(new Error('Failed to open database.'))
        }
      }

      request.onupgradeneeded = (event) => {
        this.db = (event.target as IDBRequest).result

        if (this.db && !this.db.objectStoreNames.contains(this.tableName)) {
          const objectStore = this.db.createObjectStore(this.tableName, {
            keyPath: 'id',
            autoIncrement: true,
          })
          console.log('Object store created', objectStore)
        }
      }
    })
  }

  public async addGrid(grid: number[][]): Promise<number> {
    try {
      const db = await this.ensureDb() // Ensure DB is opened and non-null

      const transaction = db.transaction([this.tableName], 'readwrite')
      const objectStore = transaction.objectStore(this.tableName)
      const request = objectStore.add({ grid })

      return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
          console.log(
            'Grid stored successfully with ID:',
            (event.target as IDBRequest).result,
          )
          resolve((event.target as IDBRequest).result as number)
        }

        request.onerror = (event) => {
          console.error(
            'Error storing grid:',
            (event.target as IDBRequest).error,
          )
          reject((event.target as IDBRequest).error)
        }
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async getGrid(id: number): Promise<number[][] | null> {
    try {
      const db = await this.ensureDb() // Ensure DB is opened and non-null

      const transaction = db.transaction([this.tableName])
      const objectStore = transaction.objectStore(this.tableName)
      const request = objectStore.get(id)

      return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
          if (request.result) {
            console.log('Retrieved grid:', request.result.grid, event)
            resolve(request.result.grid)
          } else {
            console.log('Grid not found')
            resolve(null)
          }
        }

        request.onerror = (event) => {
          console.error(
            'Error retrieving grid:',
            (event.target as IDBRequest).error,
          )
          reject((event.target as IDBRequest).error)
        }
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async updateGrid(id: number, newGrid: number[][]): Promise<boolean> {
    try {
      const db = await this.ensureDb() // Ensure DB is opened and non-null

      const transaction = db.transaction([this.tableName], 'readwrite')
      const objectStore = transaction.objectStore(this.tableName)

      const existingRecordRequest = objectStore.get(id)

      return new Promise((resolve, reject) => {
        existingRecordRequest.onsuccess = (event) => {
          if (existingRecordRequest.result) {
            const updateRequest = objectStore.put({ id, grid: newGrid })

            updateRequest.onsuccess = () => {
              console.log(`Grid with ID ${id} updated successfully.`, event)
              resolve(true)
            }

            updateRequest.onerror = (event) => {
              console.error(
                'Error updating grid:',
                (event.target as IDBRequest).error,
              )
              reject((event.target as IDBRequest).error)
            }
          } else {
            console.log('Grid not found, cannot update')
            resolve(false)
          }
        }

        existingRecordRequest.onerror = (event) => {
          console.error(
            'Error fetching grid for update:',
            (event.target as IDBRequest).error,
          )
          reject((event.target as IDBRequest).error)
        }
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  private async ensureDb(): Promise<IDBDatabase> {
    if (this.db) {
      return this.db
    } else {
      return await this.openDatabase()
    }
  }
}

export default new IndexedDB('MinesweeperDB', 'minesweeperGrids')
