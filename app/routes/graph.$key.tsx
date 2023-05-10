import { faker } from '@faker-js/faker'
import { json } from '@remix-run/node'
import type { LoaderArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'

export type RawGraphData = {
  labels: string[]
  datasets: {
    label?: string
    data: number[]
  }[]
}

const monthLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.key, 'Missing key')

  await timeout(Math.floor(Math.random() * 1000))

  let rawGraphData: RawGraphData
  switch (params.key) {
    case 'simple-lines':
      rawGraphData = {
        labels: monthLabels,
        datasets: [
          {
            label: faker.finance.accountName(),
            data: Array.from(
              { length: 12 },
              () => Math.floor(Math.random() * 4000) + 1000
            ),
          },
          {
            label: faker.finance.accountName(),
            data: Array.from(
              { length: 12 },
              () => Math.floor(Math.random() * 4000) + 1000
            ),
          },
        ],
      }
      break

    case 'simple-pie':
      rawGraphData = {
        labels: Array.from({ length: 10 }, () => faker.address.cityName()),
        datasets: [
          {
            data: Array.from(
              { length: 10 },
              () => Math.floor(Math.random() * 4000) + 1000
            ).sort((a, b) => b - a),
          },
        ],
      }
      break

    default:
      throw new Error(`Unknown graph key: ${params.key}`)
  }

  return json(rawGraphData)
}
