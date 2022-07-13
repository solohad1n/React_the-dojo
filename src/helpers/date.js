import { format, formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export const dueDate = (date, lang = ru) => format(date, 'EEEE d MMMM y', { locale: lang })
export const toNow = (date, lang = ru) => {
  return formatDistanceToNow(date, { locale: lang })
}