import { styled } from '@mui/material'
import boxShadow2 from 'modules/components/styled/boxShadow'
import Container from 'modules/components/styled/Container'

export default styled(Container)({
    position: 'fixed',
    boxShadow: boxShadow2,
    top: '78px',
    zIndex: 20,
    backgroundColor: 'white',
    paddingLeft: '0',
    paddingRight: '0'
})
