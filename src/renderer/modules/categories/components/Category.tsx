import { PureComponent } from "react";
import localize from "scripts/localize";
import main from "scripts/main";
import local from "scripts/storage";
import { callback } from "scripts/helpers";
import ListType from "modules/list/enums/ListType";
import { showLoading } from "components/Loading";

import { CardActionArea } from "@mui/material";
import Card from "../styled/Card";
import CardMedia from "../styled/CardMedia";
import CardContent from "../styled/CardContent";
import CardTitle from "../styled/CardTitle";

const { openWindow } = main;

interface IProps {
    name: ListType
}

class Category extends PureComponent<IProps> {
    private imgSrc: string;
    private cardStyle = {
        boxShadow: "none",
        borderRadius: 0
    };

    constructor(props: IProps) {
        super(props);
        this.imgSrc = require(`images/category/${this.props.name}_category.png`);
    };

    public render() {
        const { name } = this.props;

        return (
            <Card style={this.cardStyle}>
                <CardActionArea onClick={this.openList}>
                    <CardMedia image={this.imgSrc}/>
                    <CardContent>
                        <CardTitle>
                            {localize[`${name.toUpperCase()}_CATEGORY_TITLE`]}
                        </CardTitle>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }

    @callback
    private openList() {
        const { name } = this.props;

        showLoading();
        local.set("listType", name);
        openWindow("List");
    }
}

export default Category;
