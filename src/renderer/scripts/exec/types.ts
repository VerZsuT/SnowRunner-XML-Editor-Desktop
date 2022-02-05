import { MessageType } from 'modules/console/enums'

export interface IMessage {
    type: MessageType
    text: string
}

export interface IMap {
    [key: string]: string
}

export type ITemp = IMap & {
    currentAction?: string
    currentDOM?: Document
    currentSelector?: string
    currentAttribute?: string
}

export interface IVars {
    [key: string]: string | IVars
}


export enum SysVars {
    prompt = '@prompt',
    extend = '@extend',
    calc = '@calc',
    curElVal = '#sys:current',
    varPrefix = '#',
    funcPrefix = '@',
    varRegExp = '[a-z0-9:_]+',
    objectDot = ':'
}

export enum Tag {
    main='sxmle_execute',
    task='task',
    taskBlock='block',
    vars='vars'
}

export enum MainAttr {
    version='version',
    gameVersion='game_version',
    requiredDLC='required_dlc'
}

export enum TaskAttr {
    action = 'action',
    filePath = 'path',
    attrName = 'name',
    attrSelector = 'selector',
    attrValue = 'value',
    fileType = "type"
}

export enum FileType {
    main='main',
    mod='mod'
}

export enum TaskAction {
    writeFile = 'write-file',
    setAttribute = 'set-attribute'
}


export enum VarAttr {
    key = 'name',
    preserve = "preserve"
}


export enum VarType {
    string = 'string',
    number = 'number',
    object = "object"
}

export enum PromptProp {
    text='text',
    type='type',
    default='default',
    min='min',
    max='max'
}

export enum PromptType {
    text='text',
    number='number'
}

export type ConfirmFunc = (text: string) => Promise<boolean>
export type PromptFunc = (text: string, type: string, defaultVal?: string, min?: string, max?: string) => Promise<string>
