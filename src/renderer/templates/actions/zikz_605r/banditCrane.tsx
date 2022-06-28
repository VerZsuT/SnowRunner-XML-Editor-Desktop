import type { CSSProperties } from "react";

import { Button, Typography } from "@mui/material";
import Container from "components/styled/Container";
import Warning from "pages/main/editor/styled/Warning";
import { callback } from "scripts/helpers";
import localize from "scripts/localize";
import type IActionData from "types/IActionData";
import type IActionProps from "types/IActionProps";
import type IIEAllow from "types/IIEAllow";

import Action from "../Action";
import texts from "../texts";

const {
    CRANES_WARN_TITLE,
    BANDIT_WARN_MESSAGE,
    ADD,
    REMOVE
} = texts;

export const data: IActionData = {
    name: localize({
        RU: "Банан бандита",
        EN: "Bandit banana",
        DE: "Bananen-Bandit",
        CH: "香蕉大盗"
    }),
    id: "bandit-crane",
    minHeight: 200,
    minWidth: 350,
    imgSRC: require("images/icons/editor/banana.png"),
    isActive(_, fileName) { return fileName === "zikz_605r"; }
};

interface IExportData {
    hasCrane: boolean;
}

interface IState {
    hasCrane: boolean;
}

/** Вкладка `Банан бандита`. */
class BanditCrane extends Action<IState> implements IIEAllow<IExportData> {
    private styles = {
        warn: {
            textAlign: "left",
            padding: "0 10px"
        } as CSSProperties,
        buttons: {
            marginTop: "10px"
        }
    };

    constructor(props: IActionProps) {
        super(props, data, BanditCrane);
        this.state = { hasCrane: false };
    }

    public export(): IExportData {
        return { hasCrane: this.hasCrane() };
    }

    public import(data: IExportData) {
        if (data.hasCrane && !this.hasCrane())
            this.addCrane();
    }

    public componentDidMount() {
        this.setState({ hasCrane: this.hasCrane() });
    }

    public render() {
        return <>
            <Warning>{CRANES_WARN_TITLE}</Warning>
            <Container style={this.styles.warn}>
                <Typography>
                    {CRANES_WARN_TITLE}
                </Typography>
                <Typography>
                    {BANDIT_WARN_MESSAGE}
                </Typography>
            </Container>
            <Container style={this.styles.buttons}>
                {this.state.hasCrane
                    ? (
                        <Button variant="contained" color="warning" onClick={this.removeCrane}>
                            {REMOVE}
                        </Button>
                    )
                    : (
                        <Button variant="contained" onClick={this.addCrane}>
                            {ADD}
                        </Button>
                    )}
            </Container>
        </>;
    }

    @callback
    private addCrane() {
        const AddonSockets = this.props.dom("AddonSockets").eq(0);
        const Trunk = this.props.dom("Socket[Names=\"zikz605rTrunk\"]").eq(0);
        const FrameAddon = this.props.dom("Socket[Names=\"ZikzFrameAddon\"]").eq(0);

        AddonSockets.after(`
        <AddonSockets>
            <Socket Names="CraneKrs58Bandit" Offset="(-1.25; 0; 0)" NamesBlock="ZikzLogLift, ZikzBigCrane, FrameAddonKungZikz, FrameAddonSeismicVibratorZikz, FrameAddonTankZikz, FrameAddonLogShortZikz" ParentFrame="BoneAddonAttachment_cdt"/>
        </AddonSockets>`);
        Trunk.attr("NamesBlock", `CraneKrs58Bandit, ${Trunk.attr("NamesBlock")}`);
        FrameAddon.append("<AddonsShift Offset=\"(-0.5; 0; 0)\" Types=\"CraneKrs58Bandit\"/>");

        this.setState({ hasCrane: true });
    }

    @callback
    private removeCrane() {
        const Socket = this.props.dom("Socket[Names=\"CraneKrs58Bandit\"]").eq(0);
        const Trunk = this.props.dom("Socket[Names=\"zikz605rTrunk\"]").eq(0);
        const FrameAddon = this.props.dom("Socket[Names=\"ZikzFrameAddon\"]").eq(0);

        Socket.parent().remove();
        Trunk.attr("NamesBlock", Trunk.attr("NamesBlock").replace("CraneKrs58Bandit, ", ""));
        FrameAddon.find("AddonsShift[Types=\"CraneKrs58Bandit\"]").eq(0).remove();

        this.setState({ hasCrane: false });
    }

    private hasCrane() {
        return !!this.props.dom("Socket[Names=\"CraneKrs58Bandit\"]").length;
    }
}

export default BanditCrane;
