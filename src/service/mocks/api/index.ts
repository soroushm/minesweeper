import { http, HttpResponse } from 'msw'
import {
  generateMinesweeperGrid,
  type Options as GenerateOptions,
} from '../../../utils/generateMinesweeperGrid'

export const board = http.post('/board', async ({ request }) => {
  const options = (await request?.json()) as GenerateOptions
  return HttpResponse.json({
    id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
    rows: generateMinesweeperGrid(options),
  })
})
