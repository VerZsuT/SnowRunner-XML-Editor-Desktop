import { memo } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

import texts from "../texts";

const { SEARCH } = texts;

interface IProps {
    value: string;
    onChange(value: string): void;
}

const Search = (props: IProps) => {
    const { value, onChange } = props;

    return (
        <div className="search">
            <Input
                placeholder={SEARCH}
                onChange={e => onChange(e.target.value)}
                value={value}
                bordered={false}
            />
            <SearchOutlined className="search-icon" />
        </div>
    );
};

export default memo(Search);
