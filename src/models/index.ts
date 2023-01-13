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
