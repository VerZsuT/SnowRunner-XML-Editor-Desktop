import { ChangeEvent, PureComponent } from 'react'
import { t } from 'scripts'

import {
    InputBase,
    styled
} from '@mui/material'
import {
    Search as SearchIcon
} from '@mui/icons-material'

const SearchMUI = styled('div')({
    position: 'absolute',
    width: '178px',
    height: '30px',
    backgroundColor: '#2196f3',
    top: '9px',
    right: '17px',
    borderRadius: '3px'
})

const SearchIconWrapper = styled('div')({
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    top: '3px',
    left: '5px'
})
  
const StyledInputBase = styled(InputBase)({
    color: 'inherit',
    '& .MuiInputBase-input': {
        paddingLeft: '34px'
    }
})

const SearchContainer = styled('div')({
    position: 'absolute',
    top: 0,
    right: '10px',
    display: 'flex',
    alignItems: 'flex-end'
})

interface IProps {
    value: string
    onChange(value: string): void
}

export class Search extends PureComponent<IProps> {
    render() {
        return (
            <SearchContainer>
                <SearchMUI>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        id='search'
                        placeholder={t.SEARCH}
                        onChange={this.onChange}
                    />
                </SearchMUI>
            </SearchContainer>
        )
    }

    private onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e.target.value)
    }
}
