import { Button } from '@mui/material'
import React from 'react'

type ButtonProps = {
  children: React.ReactNode;  
  onClick?: () => void;
  active?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}
const ButtonFragment = ({children, onClick, active=true, type, ...props }: ButtonProps) => {
  const buttonStyle = {
    color: '#FFFFFF',
    borderRadius:'8px',
    bgcolor:'secondary.main',
    padding: '7px 10px',
    fontSize: '1rem',
    fontWeight: '400',
    filter: `${active ? '' : 'brightness(.5)'}`,
    textTransform: 'unset !important',
  }
  return (
    <Button
      onClick={onClick}
      sx={buttonStyle}
      disableElevation={true}
      type={type}
      {...props}
    >
      {children}
    </Button>
  )
}

export default ButtonFragment