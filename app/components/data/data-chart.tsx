import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  Filler,
} from 'chart.js'
import type { ChartDataset, ChartData } from 'chart.js'
import { useMemo } from 'react'
import { Doughnut, Line, Pie } from 'react-chartjs-2'

import { getDatasetColour } from '~/helpers/colours'
import type { RawGraphData } from '~/routes/graph.$key'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  parsing: {
    xAxisKey: 'month',
    yAxisKey: 'sum',
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        color: 'rgba(0,0,0,0.0)',
      },
    },
    y: {
      stacked: true,
      grid: {
        color: 'rgba(0,0,0,0.0375)',
        fontColor: '#fff',
      },
    },
  },
}

type DataCardProps = {
  type: string
  rawGraphData?: RawGraphData
}

export default function DataChart({ type, rawGraphData }: DataCardProps) {
  switch (type) {
    case 'pie':
      return <PieChart rawGraphData={rawGraphData} />
    case 'doughnut':
      return <DoughnutChart rawGraphData={rawGraphData} />
    default:
      return <LineChart rawGraphData={rawGraphData} />
  }
}

const LineChart = ({ rawGraphData }: { rawGraphData?: RawGraphData }) => {
  const chartData = useMemo((): ChartData<'line'> | null => {
    if (!rawGraphData) return null

    return {
      ...rawGraphData,
      datasets: rawGraphData.datasets.map(
        (dataset: ChartDataset<'line'>, idx: number): ChartDataset<'line'> => {
          return {
            ...dataset,
            borderColor: getDatasetColour(idx),
            backgroundColor: getDatasetColour(idx),
            tension: 0.4,
          }
        }
      ),
    }
  }, [rawGraphData])

  if (!chartData) return null
  return <Line data={chartData} options={chartOptions} />
}

const PieChart = ({ rawGraphData }: { rawGraphData?: RawGraphData }) => {
  const chartData = useMemo((): ChartData<'pie'> | null => {
    if (!rawGraphData) return null

    return {
      ...rawGraphData,
      datasets: rawGraphData.datasets.map(
        (dataset: ChartDataset<'pie'>): ChartDataset<'pie'> => {
          return {
            ...dataset,
            borderColor: '#fff',
            backgroundColor: Array.from({ length: dataset.data.length }).map(
              (_, idx: number) => getDatasetColour(idx)
            ),
          }
        }
      ),
    }
  }, [rawGraphData])

  const options = {
    ...chartOptions,
  }

  if (!chartData) return null

  return <Pie data={chartData} options={options} />
}

const DoughnutChart = ({ rawGraphData }: { rawGraphData?: RawGraphData }) => {
  const chartData = useMemo((): ChartData<'doughnut'> | null => {
    if (!rawGraphData) return null

    return {
      ...rawGraphData,
      datasets: rawGraphData.datasets.map(
        (dataset: ChartDataset<'doughnut'>): ChartDataset<'doughnut'> => {
          return {
            ...dataset,
            borderColor: '#fff',
            backgroundColor: Array.from({ length: dataset.data.length }).map(
              (_, idx: number) => getDatasetColour(idx)
            ),
          }
        }
      ),
    }
  }, [rawGraphData])

  const options = {
    ...chartOptions,
  }

  if (!chartData) return null

  return <Doughnut data={chartData} options={options} />
}