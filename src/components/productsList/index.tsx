import { CircularProgress, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ProductType, useOrders } from '../../context/useOrders'
import PaginationButtons from '../../fragments/paginationButtons'
import api from '../../services/api'
import Pagination from '../pagination'
import ProductsDataTable from '../productsDataTable'

const ProductsList = () => {
  const {orderType, productsData, setProductsData} = useOrders()

  const [currentPage, setCurrentPage] = useState(0),
  [loading, setLoading] = useState(false)

  const itemsPerPage = 8
  const totalPages = productsData ? Math.ceil(productsData?.length / itemsPerPage) : 0

  useEffect(() => {
    setCurrentPage(0)
  }, [productsData, setCurrentPage])
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true)
        const response = await api.get(`${orderType}`)
        const {data, status} = response
        if (status !== 200) throw new Error()
        setProductsData(data.products)
      } catch (e) {
        setProductsData(null)
      } finally {
        setLoading(false)
      }
    }
    if (orderType === 'all') {
      getProducts()
    }
    if (orderType === 'favorites') {
      const favoritesItems = localStorage.getItem('favoritesItems')
      if (favoritesItems) {
        const parseItems = JSON.parse(favoritesItems)
        setProductsData(parseItems)
      }
    }
  }, [orderType, setProductsData])
  return (
    <Stack width='100%' spacing='10px'>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb='24px'>
        <Typography typography='subtitle' color='#061237'>{orderType === 'all' ? 'Todos os produtos' : 'Favoritos'}</Typography>
        {(productsData as ProductType[])?.length > 1 && <PaginationButtons currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />}
      </Stack>
      {productsData ? <ProductsDataTable itemsPerPage={itemsPerPage} currentPage={currentPage}  /> : loading ? (
         <>
         <CircularProgress />
       </>
      ) : 'Não foi possível retornar os produtos. Tente mais tarde.'}
      <Stack width='100%' alignItems='end'>
        {(productsData as ProductType[])?.length > 1 && <Pagination page={currentPage} totalPages={totalPages} />}
      </Stack>
    </Stack>
  )
}

export default ProductsList