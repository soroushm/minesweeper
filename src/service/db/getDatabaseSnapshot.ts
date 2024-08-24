interface Snapshot {
  [storeName: string]: any[]
}
//
// async function getDatabaseSnapshot(dbName: string, storeNames: string[]): Promise<Snapshot> {
//   try {
//     const db = await openDatabase(dbName)
//     const snapshot: Snapshot = {}
//
//     for (const storeName of storeNames) {
//       snapshot[storeName] = await getAllFromStore(db, storeName)
//     }
//
//     return snapshot
//   } catch (error) {
//     throw new Error(`Failed to get database snapshot: ${error.message}`)
//   }
// }

function openDatabase(dbName: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName)

    request.onerror = () => {
      reject(new Error('Failed to open IndexedDB'))
    }

    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result as IDBDatabase
      resolve(db)
    }
  })
}

function getAllFromStore(db: IDBDatabase, storeName: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly')
    const objectStore = transaction.objectStore(storeName)
    const getAllRequest = objectStore.getAll()

    getAllRequest.onsuccess = (event: Event) => {
      const data = (event.target as IDBRequest).result as any[]
      resolve(data)
    }

    getAllRequest.onerror = () => {
      reject(new Error(`Failed to read store: ${storeName}`))
    }
  })
}

// Example usage
// ;(async () => {
//   try {
//     const snapshot = await getDatabaseSnapshot('MinesweeperDB', ['minsweeperGrid']);
//     console.log('Snapshot:', snapshot)
//     // You can now save this snapshot to a file, send it to a server, etc.
//   } catch (error) {
//     console.error('Error:', error)
//   }
// })()
