import { PassThrough } from 'stream'

import type { EntryContext } from '@remix-run/node'
import { Response } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import { renderToPipeableStream } from 'react-dom/server'
import { renderHeadToString } from 'remix-island'

import { Head } from './root'

const ABORT_DELAY = 5000

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let didError = false

    let { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onShellReady: () => {
          const head = renderHeadToString({ request, remixContext, Head })
          let body = new PassThrough()

          responseHeaders.set('Content-Type', 'text/html')

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          )

          body.write(
            `<!DOCTYPE html><html style="height: 100%;"><head>${head}</head><body style="height: 100%;"><div id="root" style="height: 100%;">`
          )
          pipe(body)
          body.write(`</div></body></html>`)
        },
        onShellError(error: unknown) {
          reject(error)
        },
        onError(error: unknown) {
          didError = true

          // eslint-disable-next-line no-console
          console.error(error)
        },
      }
    )

    setTimeout(abort, ABORT_DELAY)
  })
}
