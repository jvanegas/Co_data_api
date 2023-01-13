import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { Sequelize } from 'sequelize'
import { dbConnector, DbConfigType } from '../models/index.js'

// FastifyPluginAsync<Type> Type refers to the data type of
// opts argument
const getDb: FastifyPluginAsync<DbConfigType> = async (
  server: FastifyInstance,
  opts,
) => {
  const db = await dbConnector(opts)
  // Decorate (add functionality) to fastify instance
  // This allows to access the database connection using
  // <FastifyInstance>.db (db here is a Sequelize instance)
  server.decorate('db', db)
  // The decorated server is bound to the this context in route handlers
  // https://www.fastify.io/docs/latest/Reference/Decorators/
}

// Add the plugin type to the FastifyInstance type.
// This allows code to auto-complete and type validations
// https://www.fastify.io/docs/latest/Reference/TypeScript/#creating-type-definitions-for-a-fastify-plugin
declare module 'fastify' {
  interface FastifyInstance {
    db: Sequelize
  }
}

// Use fp (fastify-plugin) to register an async decorator
export default fp(getDb)
