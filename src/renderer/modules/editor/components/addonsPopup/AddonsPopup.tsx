import { Popup } from 'modules/components/Popup'
import { PureComponent } from 'react'
import { t } from 'scripts'
import { AddonContent } from './AddonContent'
import { Cranes } from './Cranes'

import {
    Tab,
    Tabs
} from '@mui/material'
import { Container } from 'modules/components/styled'

enum TabType {
    content,
    cranes,
    none
}

interface IProps {
    hidePopup(): void
    truckName: string
    fileDOM: Document
    modId: string
    show?: boolean
}

interface IState {
    selectedTab: TabType
}

export class AddonsPopup extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            selectedTab: TabType.none
        }
    }

    componentDidUpdate() {
        if (this.state.selectedTab === TabType.none) {
            this.setState({
                selectedTab: TabType.content
            })
        }
    }

    render() {
        return (
            <Popup
                show={this.props.show}
                onClose={this.props.hidePopup}
                title={t.ADDONS_POPUP_TITLE}
            >
                <Container style={{ marginBottom: '10px' }}>
                    <Tabs
                        value={this.state.selectedTab}
                        onChange={(_, value) => this.selectTab(value)}
                        centered
                    >
                        <Tab label={t.ADDON_CONTENT}/>
                        <Tab label={t.CRANES}/>
                    </Tabs>
                </Container>
                <AddonContent
                    fileDOM={this.props.fileDOM}
                    truckName={this.props.truckName}
                    modId={this.props.modId}
                    show={this.state.selectedTab === TabType.content}
                />

                <Cranes
                    fileDOM={this.props.fileDOM}
                    show={this.state.selectedTab === TabType.cranes}
                />
            </Popup>
        )
    }

    private selectTab = (tab: TabType) => {
        this.setState({
            selectedTab: tab
        })
    }
}
