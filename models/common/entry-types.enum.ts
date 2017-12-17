/**
 * Описывает тип записи на ресурс медицинской организации (строковой набор при описании записи)
 */
export enum EntryTypes {
	DOCTOR_ENTRY = 'DOCTOR_ENTRY', /* Предварительная запись на прием к врачу */
	E_QUEUE_ENTRY = 'E_QUEUE_ENTRY', /* Запись в электронную очередь */
	DOCTORS_REQUEST_ENTRY = 'DOCTORS_REQUEST_ENTRY', /* Вызов врача на дом */
	EXAM_ENTRY = 'EXAM_ENTRY' /* Запись на инструментальное исследование */
}