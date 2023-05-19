import { faker } from '@faker-js/faker'
import { fetch, json } from '@remix-run/node'
import type { LoaderArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'

export type RawGraphData = {
  labels: string[]
  datasets: {
    label?: string
    data: number[]
  }[]
}

interface PopulationDataSet {
  data: {
    'ID Nation': string;
    Nation: string;
    'ID Year': number;
    Year: string;
    Population: number;
    'Slug Nation': string;
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

      case 'us-population-line':
        const response = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
        const data: PopulationDataSet = await response.json()
      
        const sortedData = data.data.sort((a, b) => parseInt(a.Year) - parseInt(b.Year))

        const graphData = sortedData.reduce((acc, item) => {
          acc.labels.push(item.Year)
          acc.datasets[0].data.push(item.Population)
          return acc
        }, {
          labels: [] as string[],
          datasets: [
            {
              label: 'US Population',
              data: [] as number[],
            },
          ],
        });
      
        rawGraphData = graphData
        break

    default:
      throw new Error(`Unknown graph key: ${params.key}`)
  }

  return json(rawGraphData)
}
