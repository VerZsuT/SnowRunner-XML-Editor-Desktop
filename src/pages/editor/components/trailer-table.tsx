import type { Truck } from '@/api/bindings'
import type { DocumentSession } from '@/api/documents'
import { EditorTable } from './accordion'
import { DocumentField } from './field'
import { Group } from './group'
import { texts } from '../texts'

/** Параметры таблицы прицепа. */
export interface TrailerTableProps {
	/** Документ прицепа. */
	session: DocumentSession

	/** Модель прицепа. */
	truck: Truck
}

/** Таблица параметров прицепа: содержимое, масса и прочее, как в 1.4.0. */
export function TrailerTable({ session, truck }: TrailerTableProps) {
	const data = truck.truckData
	const body = truck.physicsModel?.body
	const fuelMass = truck.fuelMass?.body

	return (
		<EditorTable>
			<Group groupKey="inner" label={texts.trailerInner}>
				{data && (
					<>
						<DocumentField session={session} field={data.fuelCapacity} />
						<DocumentField session={session} field={data.waterCapacity} />
						<DocumentField session={session} field={data.repairsCapacity} />
						<DocumentField session={session} field={data.wheelRepairsCapacity} />
						{truck.gameData?.addonSlots && (
							<DocumentField session={session} field={truck.gameData.addonSlots.quantity} />
						)}
					</>
				)}

				{data?.wheels && (
					<Group nested label={texts.wheels}>
						{data.wheels.wheels.map((wheel, index) => (
							<Group key={index} nested label={`${texts.wheel} ${index + 1}`}>
								<DocumentField session={session} field={wheel.suspensionHeight} />
								<DocumentField session={session} field={wheel.suspensionStrength} />
							</Group>
						))}
					</Group>
				)}
			</Group>

			<Group groupKey="mass" label={texts.massLabel}>
				{body && (
					<>
						<DocumentField session={session} field={body.centerOfMassOffset} />
						<DocumentField session={session} field={body.mass} label={texts.trailerMass} />
					</>
				)}
				{fuelMass && <DocumentField session={session} field={fuelMass.mass} label={texts.fuelMass} />}
			</Group>

			{truck.gameData && (
				<Group groupKey="other" label={texts.trailerOther}>
					<DocumentField session={session} field={truck.gameData.price} />
				</Group>
			)}
		</EditorTable>
	)
}
