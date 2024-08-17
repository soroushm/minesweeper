import { http, HttpResponse } from 'msw'
import { type Options as GenerateOptions } from '../../../utils/generateMinesweeperGrid'
import MineField from '../../../utils/mineField'
import { isEmpty } from '../../../utils/isEmpty.ts'

export const newBoard = http.post('/board/new', async ({ request }) => {
  const options = (await request?.json()) as GenerateOptions
  const board = await MineField.newField(options)
  return HttpResponse.json(board)
})

export const updateBoard = http.post('/board/:id', async ({ request }) => {
  console.error('method not implemented', await request?.json())
  // const options = (await request?.json()) as GenerateOptions
  // const board = await MineField.newField(options)
  // return HttpResponse.json(board)
})

export const getBoard = http.get('/board/:id', async ({ params }) => {
  try {
    if (!params?.id) {
      return new HttpResponse(null, {
        status: 204,
        statusText: `board id is required ${params.id}`,
      })
    }
    const board = await MineField.getBoard(params?.id)
    if (isEmpty(board)) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'board is not defined',
      })
    }
    return HttpResponse.json(board)
  } catch (e: unknown) {
    const statusText = e instanceof Error ? e.message : 'somethings went wrong'
    return new HttpResponse(null, {
      status: 500,
      statusText,
    })
  }
})
