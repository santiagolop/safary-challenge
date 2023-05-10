import path from 'path'

import { createRequestHandler } from '@remix-run/express'
import express from 'express'

const app = express()
app.use(express.static('public', { maxAge: '1h' }))

const MODE = process.env.NODE_ENV
const BUILD_DIR = path.join(process.cwd(), 'build')

app.all(
  '*',
  MODE === 'production'
    ? createRequestHandler({ build: require(BUILD_DIR) })
    : (...args) => {
        purgeRequireCache()
        const requestHandler = createRequestHandler({
          build: require(BUILD_DIR),
          mode: MODE,
        })
        return requestHandler(...args)
      }
)

const port = process.env.PORT || 3000

app.listen(port, () => {
  require(BUILD_DIR)

  // eslint-disable-next-line no-console
  console.log(`✅ app ready: http://localhost:${port}`)
})

function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, we prefer the DX of this though, so we've included it
  // for you by default
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete require.cache[key]
    }
  }
}
