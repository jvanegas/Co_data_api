import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { Sequelize } from 'sequelize'
import { dbConnector, DbConfigType } from '../models/index.js'

const getDb: FastifyPluginAsync<DbConfigType> = async (
  server: FastifyInstance,
  opts,
) => {
  const db = await dbConnector(opts)
  server.decorate('db', db)
}

declare module 'fastify' {
  interface FastifyInstance {
    db: Sequelize
  }
}

export default fp(getDb)
