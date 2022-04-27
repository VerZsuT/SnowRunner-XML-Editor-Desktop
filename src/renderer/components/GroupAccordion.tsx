import { PureComponent } from "react";
import type { MouseEvent, ReactNode } from "react";
import { IMainContext, MainContext } from "modules/editor/MainContext";

import Accordion from "./styled/Accordion";
import Details from "./styled/Details";
import ExportCheckbox from "./styled/ExportCheckbox";
import Summary from "./styled/Summary";
import Title from "./styled/Title";
import TitleIcon from "./styled/TitleIcon";

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

class GroupAccordion extends PureComponent<IProps> {
    static contextType = MainContext;
    declare context: IMainContext;

    public render() {
        const {
            onContextMenu = () => {},
            onChangeExport,
            showExport,
            expanded,
            isExport,
            children,
            iconSRC,
            title,
            id
        } = this.props;

        return (
            <Accordion
                id={id}
                onContextMenu={onContextMenu}
                expanded={expanded}
                onChange={this.onChange}
                disableGutters
            >
                <Summary>
                    <Title>{title}</Title>
                    {iconSRC ?
                        <TitleIcon src={iconSRC}/>
                    : null}
                    {showExport ?
                        <ExportCheckbox
                            checked={isExport}
                            onChange={onChangeExport}
                        />
                    : null}
                </Summary>
                <Details>
                    {children}
                </Details>
            </Accordion>
        );
    }

    private onChange = (_: any, expanded: boolean) => {
        this.props.onChange(expanded);
    };
}

export default GroupAccordion;
