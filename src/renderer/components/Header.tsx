import { memo } from "react";

import { PageHeader, PageHeaderProps } from "antd";

type Props = {
    text: string;
    extra?: JSX.Element;
} & PageHeaderProps;

export default memo((props: Props) => (
    <PageHeader
        className="header"
        title={<h3 className="header-title">{props.text}</h3>}
        {...props}
        extra={props.extra}
    />
));
