import { ChangeEvent, PureComponent } from 'react'
import '../styles/Language'

import { Lang, mainProcess, t } from '@sxmle-service'

export default class Language extends PureComponent {
    private langOptions: JSX.Element[]

    constructor(props: any) {
        super(props)

        this.langOptions = Object.keys(Lang).map(lang =>
            <option key={lang}>
                {lang}
            </option>
        )
    }

    render() {
        return (
            <div id='language'>
                <label className='form-label'>
                    {t.LANGUAGE_MENU_ITEM_LABEL}
                </label>
                <select 
                    className='form-select lang-select'
                    onChange={this.changeLang}
                    value={config.lang}
                >
                    {this.langOptions}
                </select>
                <br/>
            </div>
        )
    }

    private changeLang = (event: ChangeEvent<HTMLSelectElement>) => {
        config.lang = event.target.value as Lang
        mainProcess.reload()
    }
}
