import { PureComponent } from 'react'
import { Lang, mainProcess, t } from 'scripts'

import {
    MenuItem,
    Select,
    SelectChangeEvent,
    InputLabel,
    styled
} from '@mui/material'
import { Container } from './styled'

const { config } = window.provider
const { reload } = mainProcess

const Label = styled(InputLabel)({
    color: 'black',
    display: 'inline-block',
    position: 'relative',
    top: '8px',
    marginRight: '15px'
})

export class Language extends PureComponent {
    private langOptions: JSX.Element[]

    constructor(props: any) {
        super(props)

        this.langOptions = Object.keys(Lang).map(lang =>
            <MenuItem key={lang} value={lang}>
                {lang}
            </MenuItem>
        )
    }

    render() {
        return (
            <Container>
                <Label id='lang-label'>
                    {t.LANGUAGE_MENU_ITEM_LABEL}
                </Label>
                <Select
                    labelId='lang-label'
                    onChange={this.changeLang}
                    value={config.lang}
                    variant='standard'
                >
                    {this.langOptions}
                </Select>
            </Container>
        )
    }

    private changeLang = (event: SelectChangeEvent) => {
        config.lang = event.target.value as Lang
        reload()
    }
}
