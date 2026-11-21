import { LoadingOutlined } from '@ant-design/icons'
import { Spin as AntSpin } from 'antd'
import './spin.scss'

/** Параметры спиннера. */
export interface SpinProps {
	/** Разместить по центру доступного места. */
	center?: boolean
}

/** Спиннер загрузки. */
export function Spin({ center }: SpinProps) {
	const indicator = <LoadingOutlined style={{ fontSize: '40px' }} spin />

	return center
		? (
			<div className="spin-container">
				<AntSpin size="large" indicator={indicator} />
			</div>
		)
		: (
			<div className="spin">
				<AntSpin size="large" indicator={indicator} />
			</div>
		)
}
