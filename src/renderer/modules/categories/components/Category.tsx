import { PureComponent } from 'react'
import { mainProcess, t } from 'scripts'
import { ListType } from 'modules/list/enums'

import {
    Card as MuiCard,
    CardActionArea,
    CardMedia as MuiCardMedia,
    CardContent as MuiCardContent,
    Typography,
    CardMediaProps,
    TypographyProps,
    styled
} from '@mui/material'
import { Loading } from 'modules/components/Loading'

const { local } = window.provider
const { openList } = mainProcess

const Card = styled(MuiCard)({
    maxWidth: '50%'
})

const CardMedia = styled((props: CardMediaProps<'img'>) =>
    <MuiCardMedia component='img' {...props}/>
)({
    height: '250px'
})

const CardContent = styled(MuiCardContent)({
    padding: '5px'
})

const CardTitle = styled((props: TypographyProps<'div'>) =>
    <Typography
        component='div'
        variant='h6'
    {...props}/>
)({
    textAlign: 'center'
})

interface IProps {
    name: ListType
}

interface IState {
    isLoading: boolean
}

export class Category extends PureComponent<IProps, IState> {
    private imgSrc: string

    constructor(props: IProps) {
        super(props)
        this.imgSrc = require(`images/category/${this.props.name}_category.png`)
        this.state = {
            isLoading: false
        }
    }

    render() {
        return (<>
            <Card>
                <CardActionArea onClick={this.openList}>
                    <CardMedia image={this.imgSrc}/>
                    <CardContent>
                        <CardTitle>
                            {t[`${this.props.name.toUpperCase()}_CATEGORY_TITLE`]}
                        </CardTitle>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Loading open={this.state.isLoading} />
        </>)
    }

    private openList = () => {
        this.setState({
            isLoading: true
        })
        local.set('listType', this.props.name)
        openList()
    }
}
