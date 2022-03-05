import { PureComponent } from 'react'
import type { ChangeEvent } from 'react'
import localize from 'scripts/localize'

import { Search as SearchIcon } from '@mui/icons-material'
import SearchContainer from './styled/SearchContainer'
import SearchMUI from './styled/SearchMUI'
import SearchIconWrapper from './styled/SearchIconWrapper'
import StyledInputBase from './styled/StyledInputBase'

interface IProps {
    value: string
    onChange(value: string): void
}

export default class Search extends PureComponent<IProps> {
    render() {
        return (
            <SearchContainer>
                <SearchMUI>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        id='search'
                        placeholder={localize.SEARCH}
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
