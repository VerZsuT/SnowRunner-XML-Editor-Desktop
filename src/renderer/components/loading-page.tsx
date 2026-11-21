import { di } from '@utilities/di/container'
import { LOADING_TOKEN, MESSAGES_TOKEN } from '@utilities/di/renderer/tokens'
import { useLoadingState } from '@renderer/utilities/use-reactive'
import { Progress, Typography } from 'antd'
import { useEffect } from 'react'
import { Spin } from './spin'
import './loading-page.scss'

type ProgressStatus = 'success' | 'exception' | 'normal' | 'active'

/** Страница загрузки. */
export function LoadingPage() {
	const loading = di.resolve(LOADING_TOKEN)
	const messages = di.resolve(MESSAGES_TOKEN)
	const state = useLoadingState()

	const progressStatus: ProgressStatus = state.hasError
		? 'exception'
		: state.completedCount >= state.stagesCount
			? 'success'
			: 'active'

	useEffect(() => {
		if (state.hasError) {
			messages.error(state.error)
		}
	}, [state.hasError, state.error, messages])

	if (!state.isLoading) {
		return null
	}

	return (
		<div className="loading-page">
			<Typography.Title className="title" level={4}>
				{state.text}
			</Typography.Title>

			{state.stagesCount === 1
				? <Spin center />
				: (
					<Progress
						className="progress"
						type="line"
						percent={loading.percent}
						status={progressStatus}
						showInfo={progressStatus !== 'success'}
					/>
				)}
		</div>
	)
}
