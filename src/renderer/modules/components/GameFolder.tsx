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
    constructor(props: IProps) {
        super(props)

        this.state = {
            manual: false,
            gameFolder: config.initial? config.initial.replace('\\initial.pak', '') : ''
        }
    }

    render() {
        return (<>
            <TopContainer>
                <TextField
                    label={this.state.manual ? localize.INITIAL_LABEL : localize.GAME_FOLDER_LABEL}
                    title={this.state.gameFolder}
                    value={this.state.gameFolder}
                    InputProps={{ readOnly: true }}
                    variant='standard'
                />
                <IconButton onClick={this.getFolder}>
                    {this.state.manual
                        ? <FileOpenIcon />
                        : <FolderOpenIcon />
                    }
                </IconButton>
            </TopContainer>
            <BottomContainer>
                <FormControlLabel
                    control={
                        <Checkbox checked={this.state.manual} onChange={this.toggleManual}/>
                    }
                    label={localize.MANUAL_INITIAL}
                    title={localize.AUTO_INITIAL_TITLE}
                />
            </BottomContainer>
        </>)
    }

    private getFolder = () => {
        let data: IFolder

        if (this.state.manual) {
            data = this.props.preload.getInitial()

            if (!data) {
                return
            }
            data.folder = data.initial
        }
        else {
            data = this.props.preload.getGameFolder()
        }

        if (!data) {
            return
        }

        this.setState({ gameFolder: data.folder })
        this.props.onChange(data.initial)
    }

    private toggleManual = () => {
        this.setState({
            manual: !this.state.manual,
            gameFolder: ''
        })
        this.props.onChange('')
    }
}
