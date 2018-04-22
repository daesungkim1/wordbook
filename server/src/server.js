// @flow

import logger from './logger'
import createApp from './app'

const PORT = process.env.PORT
const HOST = '0.0.0.0'

export default (done?: () => null = () => null) => {
  const app = createApp()
  return app.listen(PORT, HOST, (e: any) => {
    logger.log('info', `Server started on ${HOST}:${PORT}`)
    done(e)
  })
}
