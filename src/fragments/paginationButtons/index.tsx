import { Box, Stack } from '@mui/material'
import React from 'react'

type Props = {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (cb: (prevState: number) => number) => void;
}

const PaginationButtons = ({currentPage, totalPages, setCurrentPage}: Props) => {
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevState => prevState - 1 )
        }
      }
      const handleNextPage = () => {
        if (currentPage + 1 < totalPages) {
            setCurrentPage(prevState => prevState + 1 )
        }
      }
    
  return (
    <Stack direction='row' alignItems='center' justifyContent='space-between'  color='#235EE7' spacing='18px'>
        <Box onClick={handlePrevPage} sx={{color: `${currentPage === 0 ? '#6B7183' : '#235EE7'}`, cursor:'pointer'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 12 12">
                <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
            </svg>
        </Box>

        <Box onClick={handleNextPage} sx={{color: `${currentPage + 1 === totalPages ? '#6B7183' : '#235EE7'}`, cursor:'pointer'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 12 12">
                <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
            </svg>
        </Box>
    </Stack>
  )
}

export default PaginationButtons