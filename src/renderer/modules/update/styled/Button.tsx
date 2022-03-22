import { ButtonProps, styled, Button as MuiButton } from '@mui/material'

export default styled((props: ButtonProps) => 
    <MuiButton variant='contained' {...props}/>
)({
    marginLeft: '5px',
    marginRight: '5px',
    textTransform: 'none'
})
