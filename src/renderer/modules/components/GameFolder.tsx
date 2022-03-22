import { PureComponent } from 'react'
import localize from 'scripts/localize'
import config from 'scripts/config'
import type IFolder from 'modules/settings/types/IFolder'

import { TextField, FormControlLabel, Checkbox } from '@mui/material'
import { FileOpen as FileOpenIcon, FolderOpen as FolderOpenIcon } from '@mui/icons-material'
import TopContainer from './styled/TopContainer'
import IconButton from './styled/IconButton'
import BottomContainer from './styled/BottomContainer'

interface IProps {
    onChange(path: string): void
    preload: {
        getInitial(): IFolder
        getGameFolder(): IFolder
    }
}

interface IState {
    manual: boolean
    gameFolder: string
}

export default class GameFolder extends PureComponent<IProps, IState> {
    private inputProps = { readOnly: true }

    constructor(props: IProps) {
        super(props)
        this.state = {
            manual: false,
            gameFolder: config.initial? config.initial.replace('\\initial.pak', '') : ''
        }
    }

    render() {
        const { manual, gameFolder } = this.state

        return <>
            <TopContainer>
                <TextField
                    label={manual ? localize.INITIAL_LABEL : localize.GAME_FOLDER_LABEL}
                    title={gameFolder}
                    value={gameFolder}
                    InputProps={this.inputProps}
                    variant='standard'
                />
                <IconButton onClick={this.getFolder}>
                    {manual
                        ? <FileOpenIcon/>
                        : <FolderOpenIcon/>
                    }
                </IconButton>
            </TopContainer>
            <BottomContainer>
                <FormControlLabel
                    control={<Checkbox checked={manual} onChange={this.toggleManual}/>}
                    label={localize.MANUAL_INITIAL}
                    title={localize.AUTO_INITIAL_TITLE}
                />
            </BottomContainer>
        </>
    }

    private getFolder = () => {
        const { preload, onChange } = this.props
        const { manual } = this.state

        let data: IFolder

        if (manual) {
            data = preload.getInitial()
            if (!data)
                return

            data.folder = data.initial
        }
        else {
            data = preload.getGameFolder()
        }

        if (!data)
            return

        this.setState({ gameFolder: data.folder })
        onChange(data.initial)
    }

    private toggleManual = () => {
        const { onChange } = this.props

        this.setState(({ manual }) => ({
            manual: !manual,
            gameFolder: ''
        }))
        onChange('')
    }
}
