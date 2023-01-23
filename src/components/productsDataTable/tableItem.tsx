import { Box, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import Image from 'next/image'
import React, { useState } from 'react'
import placeholderImage from '../../assets/placeholderImage.png'
import { ProductType } from '../../context/useOrders'


const TableItem = ({item}: {item: ProductType}) => {
    const localItems = localStorage.getItem("favoritesItems") ? localStorage.getItem("favoritesItems") : null 

    const isItemSavedAsFavoriteBefore = localItems ? JSON.parse(localItems as string)?.some((favoriteItem: ProductType) => favoriteItem.id === item.id) : false

    const [isFavorite, setIsFavorite] = useState<boolean>(isItemSavedAsFavoriteBefore)

    //operação na lista de favoritos a ser feita e retornar nova lista
    const changeFavoriteList = (isAlreadyFavorite: boolean, list: ProductType[], item: ProductType) => {
        let newFavoritesItemsArray = list;
        if (isAlreadyFavorite) {
            newFavoritesItemsArray = list.filter(listItem => listItem.id !== item.id)
        } else {
            newFavoritesItemsArray = [...list, item]
        }
        return newFavoritesItemsArray
    }

    const handleHeartClick = (item: ProductType) => {
        //marcar ou desmacar item como favorito
        setIsFavorite(prevState => !prevState)

        //pegar items do local storage (smp ao clique é preciso pegar esse item, se não o localStorage vai ficar com o valor da primeira renderizaçao)
        const localItems = localStorage.getItem("favoritesItems") ? localStorage.getItem("favoritesItems") : null 

        if (localItems) {
          //parsing a lista
          const favoritesParse = JSON.parse(localItems)
          //verificando se o item já é favorito
          const isAlreadyFavorite = favoritesParse.some((favoriteItem: ProductType) => favoriteItem.id === item.id)
          //pegando a nova lista
          const newFavoritesItemsArray = changeFavoriteList(isAlreadyFavorite, favoritesParse, item)
          //setar a nova lista no local
          localStorage.setItem('favoritesItems', JSON.stringify(newFavoritesItemsArray))

        } 
        if (!localItems) {
          localStorage.setItem('favoritesItems', JSON.stringify([item]))
        }
    }
  return (
    <tr>
        <td style={{paddingTop: '20px'}}>
        <Stack direction='row' alignItems='center'>
            <Box height={'85px'} width={'85px'} bgcolor='white' borderRadius='8px' px='24px' py='14px' mr='40px'>
            <Image src={placeholderImage} height={56} width={37} style={{objectFit: 'contain'}} alt='Product Image'/>
            </Box>
            <Stack spacing={1}>
            <Typography typography='description' fontWeight='600' color='#235EE7'>{item.description}</Typography>
            <Typography typography='description' color='#6B7183' fontWeight='400' >{item.code}</Typography>
            </Stack>
        </Stack>
        </td>
        <td style={{paddingTop: '20px'}}>
        <Typography typography='description' fontWeight='400' color='#6B7183'>{new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        }).format(item.price)}</Typography>
        </td>
        <td style={{paddingTop: '20px'}}>
        <Typography typography='description' fontWeight='400' color='#6B7183'>{item.sales} vendas</Typography>
        </td>
        <td style={{paddingTop: '20px'}}>
        <Typography typography='description' fontWeight='400' color='#6B7183'>{item.stock} und</Typography>
        </td>
        <td style={{paddingTop: '20px', cursor: 'pointer'}} onClick={() => handleHeartClick(item)}>

            {isFavorite ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>
            ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg>
            )}
        </td>
    </tr>
  )
}

export default TableItem