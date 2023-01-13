import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import config from './config/index.js'
import { BaseResponse } from './types.js'
import dbPlugin from './plugins/db.js'

// Function to set a Fastify server with the given configuration (opts)
const main = async (
  opts: FastifyServerOptions = {},
): Promise<FastifyInstance> => {
  // Create the fastify server
  const app = Fastify(opts)

  // Set all the plugins, hooks, and routes for the server

  // Register a Sequelize instance (DB connection) using a Fastify Plugin.
  // This will make server.sequelize available to all the following registers.
  // This removes the need to import sequelize on every business logic that needs
  // to use the database. Is a plugin because we need to make it available to the parent
  // context (encapsulation).
  // More: https://www.fastify.io/docs/latest/Reference/Encapsulation/

  // config.dbConfig should be passed to the main(...) function,
  // not to be read directly from the import.
  // This will lead to low reusability
  await app.register(dbPlugin, config.dbConfig)

  // Register a get route for health checks.
  // Promise<TypeWhenPromiseIsResolved>
  app.get('/check', async (): Promise<BaseResponse> => {
    return { status: 'Ok' }
  })

  return app
}

// Create the server with the given opts.
// The opts can be all the configurations
// for the fastify server and the plugins.
const server: FastifyInstance = await main(config.loggerConfig)

try {
  await server.listen({ port: config.appConfig.PORT })
} catch (err) {
  server.log.error(err)
  process.exit(1)
}

// Export main (app configuration) to allow to test the server
// More: https://github.com/platformatic/node-masterclass/blob/main/simple-app/main.js
export { main }
