import { PureComponent } from 'react'
import localize from 'scripts/localize'
import main from 'scripts/main'
import local from 'scripts/storage'
import ListType from 'modules/list/enums/ListType'
import Loading from 'modules/components/Loading'

import { CardActionArea } from '@mui/material'
import Card from '../styled/Card'
import CardMedia from '../styled/CardMedia'
import CardContent from '../styled/CardContent'
import CardTitle from '../styled/CardTitle'

const { openList } = main

interface IProps {
    name: ListType
}

interface IState {
    isLoading: boolean
}

export default class Category extends PureComponent<IProps, IState> {
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
                            {localize[`${this.props.name.toUpperCase()}_CATEGORY_TITLE`]}
                        </CardTitle>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Loading open={this.state.isLoading} />
        </>)
    }

    private openList = () => {
        this.setState({ isLoading: true })
        local.set('listType', this.props.name)
        openList()
    }
}
