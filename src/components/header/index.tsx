import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useOrders } from '../../context/useOrders'
import ButtonFragment from '../../fragments/buttonFragment'
import SearchInput from '../../fragments/searchInput'

const Header = () => {
  const {orderType, setOrderType} = useOrders()
  return (
    <Stack bgcolor='primary.main'>
      <Stack direction="row" alignItems='center' justifyContent='space-between' py='38px' px='50px' borderBottom='1px solid #FFFFFF'>
        <div style={{color: '#FFFFFF', fontWeight:'700', lineHeight: '20px', fontSize: '30px'}}>xco<span style={{color: '#9765D8'}}>+</span> </div>
        <div style={{backgroundColor: '#FFFFFF', width: '32px', height: '32px', borderRadius: '50%'}}></div>
      </Stack>
      <Stack px='50px' pt='60px'>
        <Stack direction="row" alignItems='center' justifyContent='space-between' pb='60px' >
          <Typography  typography='title' color='#FFFFFF'>Produtos</Typography >
          <SearchInput />
        </Stack>
        <Stack direction="row" alignItems='center' justifyContent='space-between' py='40px' borderTop='1px solid #FFFFFF'>
          <Stack direction="row" alignItems='center' spacing={2}>
            <ButtonFragment onClick={() => setOrderType('all')} not_active={orderType !== 'all' ? true : false}>Todas</ButtonFragment>
            <ButtonFragment onClick={() => setOrderType('favorites')} not_active={orderType !== 'favorites' ? true : false}>Favoritos</ButtonFragment>
          </Stack>
          <Stack>
            <ButtonFragment>Criar novo</ButtonFragment>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Header