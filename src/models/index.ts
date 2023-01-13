import { Sequelize } from 'sequelize'
import initCity from './cities.js'

type DbConfigType = {
  database: string
  username: string
  password: string
  opts: {
    host: string
    port: number
  }
}

// This changes the usual way to import the fastify instance.
// This solution works with TS.
// https://medium.com/@samratshaw/sequelize-cli-migrations-with-typescript-bd1bd41cbd6
// This solution is based on: https://dev.to/jctaveras/sequelize-typescript-what-you-need-to-know-41mj
async function dbConnector(config: DbConfigType): Promise<Sequelize> {
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    { dialect: 'postgres', ...config.opts },
  )
  await sequelize.authenticate()
  initCity(sequelize)
  return sequelize
}

export { dbConnector, DbConfigType }
