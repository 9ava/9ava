import {createServer} from 'http'
import {getPublicDirPath} from './config'
import {makeDir} from './utils'
import {createExpressApp} from './express'
import type {MongoDB} from './mongodb'
import {connectAndUseDB} from './mongodb'

makeDir(getPublicDirPath())

const connectCallback = (db: MongoDB) => {
  const hostname = 'localhost',
    port = 4000

  createServer(createExpressApp(db)).listen(port, () =>
    console.log(`connect http://${hostname}:${port}`)
  )
}

connectAndUseDB(connectCallback, 'ch07', 'mongodb://192.168.0.20:27017')
