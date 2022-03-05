import { styled } from '@mui/material'
import boxShadow2 from 'modules/components/styled/boxShadow'
import Container from 'modules/components/styled/Container'

export default styled(Container)({
    position: 'fixed',
    boxShadow: boxShadow2,
    backgroundColor: '#1c7dca',
    top: '31px',
    color: '#fafafa',
    padding: '8px 0',
    textAlign: 'center',
    zIndex: 20
})
