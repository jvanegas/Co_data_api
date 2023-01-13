import { logger } from './logger.js'
import { app } from './app.js'
import { db } from './db.js'

export default {
  loggerConfig: logger,
  appConfig: app,
  dbConfig: db,
}
