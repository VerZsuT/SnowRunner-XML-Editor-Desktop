import { memo, useCallback } from "react";
import type { MouseEvent, ReactNode } from "react";

import Accordion from "./styled/Accordion";
import Details from "./styled/Details";
import ExportCheckbox from "./styled/ExportCheckbox";
import Summary from "./styled/Summary";
import Title from "./styled/Title";
import TitleIcon from "./styled/TitleIcon";

interface IProps {
    title: string;
    iconSRC?: string;
    children: ReactNode;
    showExport?: boolean;
    isExport?: boolean;
    onChangeExport?(): void;
    onContextMenu?(e: MouseEvent<HTMLDivElement>): void;
    id: string;
    expanded: boolean;
    onChange(expanded: boolean): void;
}

export default memo((props: IProps) => {
    const {
        onContextMenu = () => null,
        onChangeExport,
        onChange: pOnChange,
        showExport,
        expanded,
        isExport,
        children,
        iconSRC,
        title,
        id
    } = props;

    const onChange = useCallback((_: any, expanded: boolean) => {
        pOnChange(expanded);
    }, [pOnChange]);

    return (
        <Accordion
            id={id}
            onContextMenu={onContextMenu}
            expanded={expanded}
            onChange={onChange}
            disableGutters
        >
            <Summary>
                <Title>{title}</Title>
                {iconSRC
                    ? <TitleIcon src={iconSRC} />
                    : null}
                {showExport
                    ? (
                        <ExportCheckbox
                            checked={isExport}
                            onChange={onChangeExport}
                        />
                    )
                    : null}
            </Summary>
            <Details>
                {children}
            </Details>
        </Accordion>
    );
});
