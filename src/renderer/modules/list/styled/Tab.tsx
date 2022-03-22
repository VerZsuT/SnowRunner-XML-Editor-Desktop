import { styled, Tab as MuiTab, TabProps } from '@mui/material'

export default styled((props: TabProps) =>
    <MuiTab iconPosition='end' {...props}/>
)({
    fontSize: '0.92rem',
    minHeight: '57px'
})
