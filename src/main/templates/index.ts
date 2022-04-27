import type ITemplates from "./types/ITemplates";
import engine from "./engine/template";
import gearbox from "./gearbox/template";
import suspension from "./suspension/template";
import trailer from "./trailer/template";
import truck from "./truck/template";
import wheels from "./wheels/template";
import winch from "./winch/template";

export const templates: ITemplates = {
    engine,
    gearbox,
    suspension,
    trailer,
    truck,
    wheels,
    winch
};

export const extra = {};
