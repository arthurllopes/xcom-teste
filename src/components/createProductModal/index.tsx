import { Alert, AlertColor, FormControl, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useOrders } from '../../context/useOrders';
import Modal from '@mui/material/Modal';
import ButtonFragment from '../../fragments/buttonFragment';
import api from '../../services/api';

const CreateProductModal = () => {
    const {isModalOpen, setIsModalOpen, setProductsData, productsData} = useOrders()
    const [product, setProduct] = useState({description: '', code: '', sales: '', price: '', stock: ''})
    const [toast, setToast] = useState<{open: boolean, message: string, type: AlertColor | ''}>({open: false, message: '', type: ''})

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {id, value} = e.target
        setProduct({...product, [id]: value})
    }

    const renderToast = () => {
        return (
          <>
            <Snackbar
            open={true}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={4000}
            onClose={() => setToast({open: false, message: '', type: ''})}
            >
                <Alert severity={(toast.type as AlertColor)} sx={{ width: '100%' }}>
                    {toast.message}
                </Alert>
            </Snackbar>
          </>
    )}

    const handleCreateProduct = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post('/new-product', product)
            const {data, status} = response
            if (status !== 201) throw new Error()

            if (productsData) {
                setProductsData([data.product, ...productsData])
            } else {
                setProductsData([data.product])
            }
            setToast({open: true, message: 'Produto criado com sucesso!', type: 'success'})
            setIsModalOpen(false)
            setProduct(({description: '', code: '', sales: '', price: '', stock: ''}))
        } catch (e) {
            setToast({open: true, message: 'Não foi possível criar produto, tente mais tarde!', type: 'error'})
        }
    }

    const inputList = [{id: 'description', placeholder: 'Nome do produto'}, {id: 'code', placeholder: 'Código do produto'},{id: 'sales', placeholder: 'Quantidade de vendas', type: 'number'}, {id: 'price', placeholder: 'Preço do produto', type: 'number'}, {id: 'stock', placeholder: 'Quantidade de stock', type: 'number'}]

  return (
    <>
        {toast.open && renderToast()}
        <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
        >
            <Box bgcolor='#FFFFFF'borderRadius='8px' p='24px'>
                <Typography typography='subtitle'>
                    Create new Product
                </Typography>
                <form onSubmit={handleCreateProduct}>
                    <Stack width='100%' spacing={4} py={4}>
                       {inputList.map(input => (
                        <FormControl key={input.id}>
                            <TextField
                                id={input.id}
                                placeholder={input.placeholder}
                                type={input?.type || 'text'}
                                value={(product as any)[input.id]}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </FormControl>
                        ))}
                    </Stack>
                    <Stack width='100%' alignItems='end'>
                        <ButtonFragment type='submit'>Criar produto</ButtonFragment>
                    </Stack>
                </form>
            </Box>
        </Modal>
    </>
  )
}

export default CreateProductModal