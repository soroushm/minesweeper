import { http, HttpResponse } from 'msw'
import { generateMinesweeperGrid } from '/src/utils/generateMinesweeperGrid'

export const board = http.get('/board', () =>
  HttpResponse.json({
    id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
    rows: generateMinesweeperGrid({
      width: 12,
      height: 12,
      mines: 10,
    }),
  }),
)
