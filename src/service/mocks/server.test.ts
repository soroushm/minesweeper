import { server } from './server.js'

describe('MSW server', () => {
  it('to be defined', async () => {
    expect(server).toHaveProperty('listen')
  })
})
