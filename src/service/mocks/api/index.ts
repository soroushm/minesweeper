import { http, HttpResponse } from 'msw'
import MineField, { type Update } from '../../../utils/mineField'
import { isEmpty } from '../../../utils/isEmpty.ts'
import qs from 'query-string'

export const newBoard = http.get('/board/new', async ({ request }) => {
  const url = new URL(request.url)
  const options = qs.parse(url.search)
  const board = await MineField.newField(options)
  return HttpResponse.json(board)
})

export const updateBoard = http.post<Params, Update>(
  '/board/:id',
  async ({ request, params: { id } }) => {
    try {
      id = Array.isArray(id) ? id[0] : id
      if (!id) {
        return new HttpResponse(null, {
          status: 400,
          statusText: `Board ID is required. Provided value: ${id}`,
        })
      }
      console.error('method not implemented', request, id)
      const { position, actions } = await request.json()
      console.log('position', position)
      const changes = await MineField.update(id, { position, actions })
      if (isEmpty(changes)) {
        return new HttpResponse(null, {
          status: 404,
          statusText: 'Board is not defined',
        })
      }
      return HttpResponse.json(changes)
    } catch (e: unknown) {
      const statusText = e instanceof Error ? e.message : 'Somethings went wrong'
      return new HttpResponse(null, {
        status: 500,
        statusText,
      })
    }
  },
)
interface Params {
  id: string
}

// export const getBoard = http.get('/board/:id', async ({ request }) => {
//   const options = (await request?.json()) as GenerateOptions
//   const board = await MineField.getBoard(options?.id)
//   return HttpResponse.json(board)
// })
export const getBoard = http.get<Params>('/board/:id', async ({ params }) => {
  try {
    if (!params?.id) {
      return new HttpResponse(null, {
        status: 400,
        statusText: `Board ID is required. Provided value: ${params.id}`,
      })
    }
    const board = await MineField.getBoard(params.id)
    if (isEmpty(board)) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Board is not defined',
      })
    }
    return HttpResponse.json(board)
  } catch (e: unknown) {
    const statusText = e instanceof Error ? e.message : 'Somethings went wrong'
    return new HttpResponse(null, {
      status: 500,
      statusText,
    })
  }
})
