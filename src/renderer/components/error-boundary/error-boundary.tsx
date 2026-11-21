import { Component, type ErrorInfo, type ReactNode } from 'react'
import { ERROR_BOUNDARY_LOCALIZATION as texts } from './localization'
import './error-boundary.scss'

/** Параметры границы ошибок. */
interface ErrorBoundaryProps {
	/** Дочерние элементы. */
	children: ReactNode
}

/** Состояние границы ошибок. */
interface ErrorBoundaryState {
	/** Пойманная ошибка. */
	error: Error | null
}

/** Граница ошибок render-дерева. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	state: ErrorBoundaryState = { error: null }

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { error }
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error('[ui] render error', error, info.componentStack)
	}

	render() {
		const { error } = this.state

		if (!error) {
			return this.props.children
		}

		return (
			<div className="error-boundary">
				<h1>{texts.title}</h1>
				<p>{texts.description}</p>
				<pre className="error-boundary__message">{error.message}</pre>
				<button type="button" onClick={() => window.location.reload()}>{texts.restart}</button>
			</div>
		)
	}
}
