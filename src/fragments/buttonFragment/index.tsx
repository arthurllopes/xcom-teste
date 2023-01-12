import { Button } from '@mui/material'
import React from 'react'

type ButtonProps = {
  children: React.ReactNode;  
  onClick?: () => void;
  not_active?: boolean
}
const ButtonFragment = ({children, onClick, ...props }: ButtonProps) => {
  const buttonStyle = {
    color: '#FFFFFF',
    borderRadius:'8px',
    bgcolor:'secondary.main',
    padding: '7px 10px',
    fontSize: '1rem',
    fontWeight: '400',
    filter: `${props.not_active ? 'brightness(.5)' : null}`,
    textTransform: 'unset !important',
  }
  return (
    <Button
      onClick={onClick}
      {...props}
      sx={buttonStyle}
      disableElevation={true}
    >
      {children}
    </Button>
  )
}

export default ButtonFragment