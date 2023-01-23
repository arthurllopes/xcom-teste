import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import placeholderImage from '../../assets/placeholderImage.png'
import { ProductType } from '../../context/useOrders'

type Props = {
  product: ProductType
}
const ProductCard = ({product}: Props) => {
  return (
    <Stack spacing='14px' width='100%' maxWidth='168px' height='fit-content' maxHeight='203px' whiteSpace='nowrap' mb='12px'>
        <Box height={'148px'} width={'168px'} bgcolor='white' borderRadius='8px' px='24px' py='40px'>
         <Image src={placeholderImage} height={71} width={121} style={{objectFit: 'cover'}} alt='Product Image'/>
        </Box>
        <Stack spacing='6px'>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Typography typography='description' color='#6B7183'>R$ {product.price}</Typography>
                <Typography typography='description' color='#6B7183'>{product.sales} venda{product.sales > 1 ? 's' : ''}</Typography>
            </Stack>
            <Typography  typography='description' fontWeight='600' color='#235EE7' sx={{overflow:"hidden",textOverflow:'ellipsis !important'}} >{product.description}</Typography>
        </Stack>
    </Stack>
  )
}

export default ProductCard