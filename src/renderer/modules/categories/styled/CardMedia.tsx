import { CardMediaProps, styled, CardMedia as MuiCardMedia } from '@mui/material'

export default styled((props: CardMediaProps<'img'>) =>
    <MuiCardMedia component='img' {...props}/>
)({ height: '250px' })
