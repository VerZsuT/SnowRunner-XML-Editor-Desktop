import { Button, Typography } from "@mui/material";
import type { CheerioAPI } from "cheerio";
import ButtonBox from "pages/editor/styled/ButtonBox";
import Container from "pages/editor/styled/CranesContainer";
import { callback } from "scripts/helpers";
import localize from "scripts/localize";
import type IActionData from "types/IActionData";
import type IActionProps from "types/IActionProps";
import type IIEAllow from "types/IIEAllow";

import Action from "./Action";
import texts from "./texts";

const {
    SCOUT_TRAILERS,
    TRUCK_TRAILERS,
    ADD,
    REMOVE
} = texts;

enum Trailer {
    scout = "ScautTrailer",
    truck = "Trailer"
}

interface IExportData {
    hasScoutTrailer: boolean;
    hasTruckTrailer: boolean;
}

interface IState {
    hasScoutTrailer: boolean;
    hasTruckTrailer: boolean;
}

export const data: IActionData = {
    name: localize({
        RU: "Прицепы",
        EN: "Trailers",
        DE: "Anhänger",
        CH: "拖车"
    }),
    id: "trailers",
    minHeight: 100,
    imgSRC: require("images/icons/editor/trailer.png"),
    isActive(dom) { return Trailers.hasTrailers(dom).includes(true); }
};

class Trailers extends Action<IState> implements IIEAllow<IExportData> {
    constructor(props: IActionProps) {
        super(props, data, Trailers);
        this.state = {
            hasScoutTrailer: false,
            hasTruckTrailer: false
        };
    }

    public export(): IExportData {
        const [hasScoutTrailer, hasTruckTrailer] = Trailers.hasTrailers(this.props.dom);
        return { hasScoutTrailer, hasTruckTrailer };
    }

    public import(data: IExportData) {
        const [hasScoutTrailer, hasTruckTrailer] = Trailers.hasTrailers(this.props.dom);

        if (data.hasScoutTrailer && !hasScoutTrailer)
            this.addTrailer(Trailer.scout, Trailer.truck);

        if (data.hasTruckTrailer && !hasTruckTrailer)
            this.addTrailer(Trailer.truck, Trailer.scout);
    }

    public componentDidMount() {
        const [hasScoutTrailer, hasTruckTrailer] = Trailers.hasTrailers(this.props.dom);
        this.setState({ hasScoutTrailer, hasTruckTrailer });
    }

    public render() {
        const { hasScoutTrailer, hasTruckTrailer } = this.state;

        return (
            <Container>
                <ButtonBox>
                    <Typography variant="body1">{SCOUT_TRAILERS}</Typography>
                    {!hasScoutTrailer
                        ? (
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={!(hasTruckTrailer && !hasScoutTrailer)}
                                onClick={this.addScoutTrailers}
                            >
                                {ADD}
                            </Button>
                        )
                        : (
                            <Button
                                variant="contained"
                                color="error"
                                disabled={!(hasScoutTrailer && hasTruckTrailer)}
                                onClick={this.removeScoutTrailers}
                            >
                                {REMOVE}
                            </Button>
                        )}
                </ButtonBox>
                <ButtonBox>
                    <Typography variant="body1">{TRUCK_TRAILERS}</Typography>
                    {!hasTruckTrailer
                        ? (
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={!(hasScoutTrailer && !hasTruckTrailer)}
                                onClick={this.addTruckTrailers}
                            >
                                {ADD}
                            </Button>
                        )
                        : (
                            <Button
                                variant="contained"
                                color="error"
                                disabled={!(hasScoutTrailer && hasTruckTrailer)}
                                onClick={this.removeTruckTrailers}
                            >
                                {REMOVE}
                            </Button>
                        )}
                </ButtonBox>
            </Container>
        );
    }

    private addTruckTrailers = () => this.addTrailer(Trailer.truck, Trailer.scout);
    private addScoutTrailers = () => this.addTrailer(Trailer.scout, Trailer.truck);

    private removeTruckTrailers = () => this.removeTrailer(Trailer.truck);
    private removeScoutTrailers = () => this.removeTrailer(Trailer.scout);

    @callback
    private addTrailer(trailer: Trailer, to: Trailer) {
        const { dom } = this.props;
        const mainSocket = dom(`Socket[Names~="${to}"]`).length ? dom(`Socket[Names~="${to}"]`) : dom(`Socket[Names~="${to},"]`);
        const mainNames = mainSocket.attr("Names").split(",").map(value => value.trim());

        mainNames.push(trailer);
        mainSocket.attr("Names", mainNames.join(", "));

        dom(`Socket[NamesBlock~="${to}"], Socket[NamesBlock~="${to},"]`).map((_, el) => {
            const namesBlock = dom(el).attr("NamesBlock").split(",").map(value => value.trim());
            namesBlock.push(trailer);
            dom(el).attr("NamesBlock", namesBlock.join(", "));
        });
        dom(`AddonsShift[Types~="${to}"], AddonsShift[Types~="${to},"]`).map((_, el) => {
            const newShift = el.cloneNode(true);
            let types = dom(newShift).attr("Types").split(",").map(value => value.trim());

            types = types.filter(value => value !== to);
            types.push(trailer);
            dom(newShift).attr("Types", types.join(", "));
            dom(el).after(newShift);
        });

        if (trailer === Trailer.scout)
            this.setState({ hasScoutTrailer: true });

        else if (trailer === Trailer.truck)
            this.setState({ hasTruckTrailer: true });
    }

    @callback
    private removeTrailer(trailer: Trailer) {
        const { dom } = this.props;
        const mainSocket = dom(`Socket[Names~="${trailer}"]`).length ? dom(`Socket[Names~="${trailer}"]`) : dom(`Socket[Names~="${trailer},"]`);
        let mainNames = mainSocket.attr("Names").split(",").map(value => value.trim());

        mainNames = mainNames.filter(value => value !== trailer);
        mainSocket.attr("Names", mainNames.join(", "));

        dom(`Socket[NamesBlock~="${trailer}"], Socket[NamesBlock~="${trailer},"]`).map((_, el) => {
            let namesBlock = dom(el).attr("NamesBlock").split(",").map(value => value.trim());
            namesBlock = namesBlock.filter(value => value !== trailer);
            dom(el).attr("NamesBlock", namesBlock.join(", "));
        });
        dom(`AddonsShift[Types~="${trailer}"], AddonsShift[Types~="${trailer},"]`).map((_, el) => {
            dom(el).remove();
        });

        if (trailer === Trailer.scout)
            this.setState({ hasScoutTrailer: false });

        else if (trailer === Trailer.truck)
            this.setState({ hasTruckTrailer: false });
    }

    /**
     * @returns [scout, main]
     */
    public static hasTrailers(dom: CheerioAPI): [boolean, boolean] {
        return [
            !!dom("Socket[Names~=\"ScautTrailer\"], Socket[Names~=\"ScautTrailer,\"]").length,
            !!dom("Socket[Names~=\"Trailer\"], Socket[Names~=\"Trailer,\"]").length
        ];
    }
}

export default Trailers;
