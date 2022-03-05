import { styled, TableCell, TableCellProps } from '@mui/material'

export default styled((props: TableCellProps) =>
    <TableCell align='center' {...props}/>
)({ padding: '10px 16px' })
