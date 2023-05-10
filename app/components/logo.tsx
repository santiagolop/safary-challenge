import { Box, Typography } from '@mui/material'

export default function Logo() {
  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      <img src="/logo.svg" style={{ height: '40px' }} alt="Safary.club" />
      <Typography component="h1" variant="h2" color="primary">
        Safary
      </Typography>
    </Box>
  )
}
