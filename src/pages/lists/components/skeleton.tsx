import type { ListMode } from './vehicle-item'
import './skeleton.scss'

/** Сколько заглушек показывать: столько же, сколько карточек помещается на экран. */
const CARD_COUNT = 9
const ROW_COUNT = 8

/**
 * Заглушка списка на время загрузки.
 *
 * Повторяет сетку карточек и строк, поэтому после загрузки данные появляются
 * на месте заглушек без сдвига раскладки.
 */
export function ListsSkeleton({ mode }: { mode: ListMode }) {
	const count = mode === 'cards' ? CARD_COUNT : ROW_COUNT

	return (
		<div className={mode === 'cards' ? 'lists-cards' : 'lists-rows'} aria-hidden="true">
			{Array.from({ length: count }, (_, index) => (
				mode === 'cards'
					? (
						<div key={index} className="lists-skeleton-card">
							<div className="lists-skeleton-block lists-skeleton-image" />
							<div className="lists-skeleton-block lists-skeleton-card-title" />
						</div>
					)
					: (
						<div key={index} className="lists-skeleton-row">
							<div className="lists-skeleton-block lists-skeleton-thumb" />
							<div className="lists-skeleton-row-body">
								<div className="lists-skeleton-block lists-skeleton-line" />
								<div className="lists-skeleton-block lists-skeleton-line lists-skeleton-line-short" />
							</div>
						</div>
					)
			))}
		</div>
	)
}
