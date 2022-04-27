import { memo } from "react";

interface IProps {
    text: string
}

export default memo((props: IProps) => {
    return (
        <div
            style={{ display: "none" }}
            id="to-test"
        >
            {props.text}
        </div>
    );
});
