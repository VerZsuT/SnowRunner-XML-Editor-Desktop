import { IMainContext, MainContext } from 'modules/editor/MainContext'
import { MouseEvent, PureComponent, ReactNode } from 'react'

import {
    Accordion as MuiAccordion,
    AccordionSummary as MuiAccordionSummary,
    AccordionDetails as MuiAccordionDetails,
    Typography,
    Checkbox,
    AccordionSummaryProps,
    TypographyProps,
    CheckboxProps
} from '@mui/material'
import { ArrowForwardIosSharp as ArrowIcon } from '@mui/icons-material'
import { styled } from '@mui/system'
import { boxShadow2 } from './styled'

const ArrowForward = styled(ArrowIcon)({
    fontSize: '0.9rem'
})

const Accordion = styled(MuiAccordion)({
    boxShadow: boxShadow2,
    '&:before': {
        display: 'none'
    }
})
  
const Summary = styled((props: AccordionSummaryProps) =>
    <MuiAccordionSummary
        expandIcon={<ArrowForward />}
        {...props}
    />
)({
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)'
    }
})

const Title = styled((props: TypographyProps) => 
    <Typography variant='body2' {...props}/>
)({
    fontWeight: 'bold',
    paddingLeft: '10px'
})

const TitleIcon = styled('img')({
    position: 'absolute',
    right: '15px'
})
  
const Details = styled(MuiAccordionDetails)({
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    paddingBottom: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: '6px',
    '> .MuiPaper-root:last-child': {
        marginBottom: '10px'
    },
    '> .MuiPaper-root': {
        marginLeft: '10px',
        marginRight: '10px'
    }
})

const ExportCheckbox = styled((props: CheckboxProps) => 
    <Checkbox size='small' {...props}/>
)({
    position: 'absolute',
    right: '37px',
    top: '5px'
})

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

export class GroupAccordion extends PureComponent<IProps> {
    static contextType = MainContext
    declare context: IMainContext

    render() {
        return (
            <Accordion
                id={this.props.id}
                onContextMenu={this.props.onContextMenu ?? (() => {})}
                expanded={this.props.expanded}
                onChange={(_, expanded) => this.props.onChange(expanded)}
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
