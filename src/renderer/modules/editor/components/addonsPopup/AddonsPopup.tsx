import { PureComponent } from 'react'
import { t } from 'scripts'
import { AddonContent } from './AddonContent'
import { Cranes } from './Cranes'

enum Tab {
    content = 'content',
    cranes = 'cranes',
    none = 'none'
}

interface IProps {
    hidePopup(): void
    truckName: string
    fileDOM: Document
    modId: string
    show?: boolean
}

interface IState {
    selectedTab: Tab
}

export class AddonsPopup extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            selectedTab: Tab.none
        }
    }

    componentDidUpdate() {
        if (this.state.selectedTab === Tab.none) {
            this.setState({
                selectedTab: Tab.content
            })
        }
    }

    render() {
        return (
            <div
                className='addons-popup'
                onClick={this.props.hidePopup}
                style={{ height: this.props.show ? '100%' : '0%' }}
            >
                <div
                    className='content'
                    onClick={e => e.stopPropagation()}
                >
                    <header>{t.ADDONS_POPUP_TITLE}
                        <div className='tabs'>
                            <button
                                className={`tab${this.state.selectedTab !== Tab.content ? ' unactive' : ''}`}
                                onClick={() => this.selectTab(Tab.content)}
                            >
                                {t.ADDON_CONTENT}
                            </button>
                            <button
                                className={`tab${this.state.selectedTab !== Tab.cranes ? ' unactive' : ''}`}
                                onClick={() => this.selectTab(Tab.cranes)}
                            >
                                {t.CRANES}
                            </button>
                        </div>
                    </header>

                    <AddonContent
                        fileDOM={this.props.fileDOM}
                        truckName={this.props.truckName}
                        modId={this.props.modId}
                        show={this.state.selectedTab === Tab.content}
                    />

                    <Cranes
                        fileDOM={this.props.fileDOM}
                        show={this.state.selectedTab === Tab.cranes}
                    />
                </div>
            </div>
        )
    }

    private selectTab = (tab: Tab) => {
        this.setState({
            selectedTab: tab
        })
    }
}
