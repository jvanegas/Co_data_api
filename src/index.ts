import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import config from './config/index.js'
import { BaseResponse } from './types.js'

const main = async (
  opts: FastifyServerOptions = {},
): Promise<FastifyInstance> => {
  const app = Fastify(opts)
  return app
}

const server: FastifyInstance = await main(config.loggerConfig)
server.get('/check', async (): Promise<BaseResponse> => {
  return { status: 'Ok' }
})

try {
  await server.listen({ port: config.appConfig.PORT })
} catch (err) {
  server.log.error(err)
  process.exit(1)
}

server.log.info(`Server listening at ${config.appConfig.PORT}`)

export { main }
