import { CircularProgress, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PaginationButtons from '../../fragments/paginationButtons'
import Pagination from '../pagination'
import ProductCard from '../productCard'
import api from '../../services/api'
import { ProductType } from '../../context/useOrders'

const BestSellers = () => {
  const [currentPage, setCurrentPage] = useState(0),
  [loading, setLoading] = useState(false),
  [data, setData] = useState<null | ProductType[]>()

  const itemsPerPages = 8
  const totalPages = data ? Math.ceil(data?.length / itemsPerPages) : 0

  
  useEffect(() => {
    const getBestSellersProducts = async () => {
      try {
        setLoading(true)
        const response = await api.get('/best-sellers')
        const {data, status} = response
        if (status !== 200) throw new Error()
        setData(data.bests)
      } catch (e) {
        setData(null)
      } finally {
        setLoading(false)
      }
    }
    getBestSellersProducts()
  }, [currentPage])
  return (
    <Stack width='100%' spacing='10px'>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb='24px'>
        <Typography typography='subtitle' color='#061237'>Mais vendidos</Typography>
        {data && <PaginationButtons currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />}
      </Stack>
      <Grid width='100%' container columns={2} bgcolor='#F3F5F9' p='30px' justifyContent='space-between'>
       {data ? (
        data?.slice((currentPage * itemsPerPages), (currentPage + 1) * itemsPerPages).map(item => (
          <Grid key={item.id} >
            <ProductCard product={item} />
          </Grid>
        ))
       ) : (
        loading ? (
          <>
            <CircularProgress />
          </>
        ) : (
          <Typography typography='description' color='#061237'>Não foi possível buscar os itens, tente novamente mais tarde.</Typography>
        )
       )}
      </Grid>
      <Stack width='100%' alignItems='end'>
        {data && <Pagination page={currentPage} totalPages={totalPages} />}
      </Stack>
    </Stack>
  )
}

export default BestSellers