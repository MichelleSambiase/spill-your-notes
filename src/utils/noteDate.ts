import { differenceInDays,format,  } from 'date-fns'
import { es } from 'date-fns/locale'


export const humanReadable = (created_at: string | number | Date) => {
  const localeDate = new Date(created_at)
  
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
      return format(new Date(created_at), 'EEEE', {locale: es})
    default:
      return daysAgo
  }
}

export const todayDate = (date: Date | string) => format(new Date(date), 'd LLLL, hh:mm b', {
  locale: es
})