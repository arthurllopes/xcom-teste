import { Typography } from '@mui/material'
import React, { useRef } from 'react'
import { ProductType, useOrders } from '../../context/useOrders'
import TableItem from './tableItem'

type Props = {
  itemsPerPage: number,
  currentPage: number
}
const ProductsDataTable = ({itemsPerPage, currentPage} :Props) => {
  const {productsData} = useOrders()
  const dataPerPage = (productsData as ProductType[])?.length >= 1 ? productsData?.slice((currentPage * itemsPerPage), (currentPage + 1) * itemsPerPage) : []

  return (
    <div style={{backgroundColor: '#F3F5F9', padding: '24px 30px', borderRadius: '8px', width: '100%'}}>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{borderBottom: '1px solid rgba(0, 0, 0, 0.1)', fontSize: '.875rem', fontWeight: '600', color: '#99A0B0'}}>
            <th style={{textAlign: 'start',  paddingBottom: '17px'}}>IDENTIFICAÇÃO</th>
            <th style={{textAlign: 'start',  paddingBottom: '17px'}}>PREÇO</th>
            <th style={{textAlign: 'start',  paddingBottom: '17px'}}>VENDAS</th>
            <th style={{textAlign: 'start',  paddingBottom: '17px'}}>ESTOQUE</th>
            <th style={{minWidth: '40px', paddingBottom: '17px'}}></th>
          </tr>

        </thead>
        <tbody>
          {dataPerPage?.map(item => (
            <TableItem item={item} key={item.id}/>
          ))}
        </tbody>
        {(productsData as ProductType[])?.length < 1 && 
        <Typography typography='description' >
          Sem itens no momento.
        </Typography>}
      </table>
    </div>
  )
}

export default ProductsDataTable