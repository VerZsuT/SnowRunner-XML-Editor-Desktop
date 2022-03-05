import { PureComponent } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { IMainContext, MainContext } from 'modules/editor/MainContext'

import Accordion from './styled/Accordion'
import Details from './styled/Details'
import ExportCheckbox from './styled/ExportCheckbox'
import Summary from './styled/Summary'
import Title from './styled/Title'
import TitleIcon from './styled/TitleIcon'

interface IProps {
    title: string
    iconSRC?: string
    children: ReactNode
    showExport?: boolean
    isExport?: boolean
    onChangeExport?(): void
    onContextMenu?(e: MouseEvent<HTMLDivElement>): void
    id: string
    expanded: boolean
    onChange(expanded: boolean): void
}

export default class GroupAccordion extends PureComponent<IProps> {
    static contextType = MainContext
    declare context: IMainContext

    render() {
        return (
            <Accordion
                id={this.props.id}
                onContextMenu={this.props.onContextMenu ?? (() => {})}
                expanded={this.props.expanded}
                onChange={(_, expanded) => this.props.onChange(expanded)}
                disableGutters
            >
                <Summary>
                    <Title>{this.props.title}</Title>
                    {this.props.iconSRC ?
                        <TitleIcon src={this.props.iconSRC} />
                    : null}
                    {this.props.showExport ?
                        <ExportCheckbox
                            checked={this.props.isExport}
                            onChange={this.props.onChangeExport}
                        />
                    : null}
                </Summary>
                <Details>
                    {this.props.children}
                </Details>
            </Accordion>
        )
    }
}
