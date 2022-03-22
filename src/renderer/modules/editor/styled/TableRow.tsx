import { styled, TableRow as MuiTableRow } from '@mui/material'

export default styled(MuiTableRow)({
    '&:last-child td': { borderBottom: 0 }
})
