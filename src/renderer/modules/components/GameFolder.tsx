import { PureComponent } from 'react'
import { t } from 'scripts'

import {
    TextField,
    IconButton as MuiIconButton,
    FormControlLabel,
    Checkbox,
    styled
} from '@mui/material'
import {
    FileOpen as FileOpenIcon,
    FolderOpen as FolderOpenIcon
} from '@mui/icons-material'
import { Container } from './styled'

const { config } = window.provider

const TopContainer = styled(Container)({
    marginTop: '15px'
})

const BottomContainer = styled(Container)({
    marginBottom: '15px'
})

const IconButton = styled(MuiIconButton)({
    position: 'relative',
    top: '12px'
})

interface IProps {
    onChange(path: string): void
    preload: {
        getInitial(): Folder
        getGameFolder(): Folder
    }
}

interface IState {
    manual: boolean
    gameFolder: string
}

export class GameFolder extends PureComponent<IProps, IState> {
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
                    label={this.state.manual ? t.INITIAL_LABEL : t.GAME_FOLDER_LABEL}
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
                        <Checkbox
                            checked={this.state.manual}
                            onChange={this.toggleManual}
                        />
                    }
                    label={t.MANUAL_INITIAL}
                    title={t.AUTO_INITIAL_TITLE}
                />
            </BottomContainer>
        </>)
    }

    private getFolder = () => {
        let data: Folder
        if (this.state.manual) {
            data = this.props.preload.getInitial()
            if (!data) return
            data.folder = data.initial
        } else {
            data = this.props.preload.getGameFolder()
        }

        if (!data) return

        this.setState({
            gameFolder: data.folder
        })
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
