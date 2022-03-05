import { styled, Typography, TypographyProps } from '@mui/material'

export default styled((props: TypographyProps<'div'>) =>
    <Typography component='div' variant='h6' {...props}/>
)({ textAlign: 'center' })
