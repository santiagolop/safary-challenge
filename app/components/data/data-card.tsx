import { Box, Card, CardContent } from '@mui/material'
import { useFetcher } from '@remix-run/react'
import { useEffect } from 'react'

import type { RawGraphData } from '~/routes/graph.$key'

import DataChart from './data-chart'

type DataCardProps = {
  graphKey: string
  type: string
}

export default function DataCard({ graphKey, type }: DataCardProps) {
  const fetcher = useFetcher<RawGraphData>()

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data == null) {
      fetcher.load(`/graph/${graphKey}`)
    }
  }, [graphKey, fetcher])

  return (
    <Card>
      <CardContent>
        <Box sx={{ height: '300px' }}>
          <DataChart type={type} rawGraphData={fetcher.data} />
        </Box>
      </CardContent>
    </Card>
  )
}
