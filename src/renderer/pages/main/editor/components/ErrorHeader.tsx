import {Header} from 'components/Header'
import {Page} from 'enums'
import {globalTexts} from 'globalTexts/renderer'
import type {MainDispatch} from 'pages/main/store'
import {route} from 'pages/main/store/pageSlice'
import {afcMemo, getDispatcher} from 'react-afc'

const { ERROR } = globalTexts

export const ErrorHeader = afcMemo(() => {
    const dispatch = getDispatcher<MainDispatch>()

    function onBack() {
        dispatch(route(Page.lists))
    }

    return () => (
        <Header
            text={ERROR}
            onBack={onBack}
        />
    )
})
