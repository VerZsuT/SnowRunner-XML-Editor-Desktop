import { memo } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

import { changeFilter, selectFilter } from "../../store/filterSlice";
import { useMainDispatch, useMainSelector } from "../../store/storeHooks";
import texts from "../texts";

const { SEARCH } = texts;

const Search = () => {
    const filter = useMainSelector(selectFilter);
    const dispatch = useMainDispatch();

    return (
        <div className="search">
            <Input
                placeholder={SEARCH}
                onChange={e => dispatch(changeFilter(e.target.value))}
                value={filter}
                bordered={false}
            />
            <SearchOutlined className="search-icon" />
        </div>
    );
};

export default memo(Search);
