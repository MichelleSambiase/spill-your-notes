import { differenceInDays, format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Timestamp } from 'firebase/firestore'

export const humanReadable = (created_at: string | number | Date) => {
	let localeDate

	if (created_at instanceof Timestamp) {
		// Si created_at es un Timestamp de Firestore, conviértelo a un objeto Date
		// If created_at it's an Timestamp from Firestore, convert it to a Date object
		localeDate = created_at.toDate()
	} else {
		// If not, create a Date object.
		localeDate = new Date(created_at)
	}

	// get UTC hour
	const isoDate = localeDate.toISOString()
	localeDate.setUTCHours(localeDate.getUTCHours() - 3)

	const daysAgo = format(new Date(localeDate), 'dd/MM/yy')
	const diffDays = differenceInDays(new Date(), new Date(localeDate))

	switch (true) {
		case diffDays === 0:
			return 'Hoy'
		case Number(isoDate) === 1:
			return 'Ayer'
		case diffDays <= 6:
			return format(new Date(created_at), 'EEEE', { locale: es })
		default:
			return daysAgo
	}
}

export const todayDate = (date: Date | string) => {
	if (date instanceof Timestamp) {
		date.toDate()
	} else {
		return format(new Date(date), 'd LLLL, hh:mm b', {
			locale: es
		})
	}
}
