import { Stack, Typography } from '@mui/material'
import React from 'react'

type Props = {
    page: number;
    totalPages: number
}
const Pagination = ({page, totalPages}: Props) => {
  return (
    <Typography typography='description' color='#636363'>Página {page + 1} de {totalPages}</Typography>
  )
}

export default Pagination