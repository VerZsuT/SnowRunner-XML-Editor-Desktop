import { styled, Typography, TypographyProps } from '@mui/material'

export default styled((props: TypographyProps) => 
    <Typography variant='body2' {...props}/>
)({
    fontWeight: 'bold',
    paddingLeft: '10px'
})
