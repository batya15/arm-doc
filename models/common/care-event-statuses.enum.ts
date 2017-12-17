/**
 * Описывает статус клинического события
 * (строковой набор для вывода в блоке информации о ранее созданном клиническом событии)
 */
export enum CareEventStatuses {
	RUNNING = 'RUNNING', // Выполняется
	DEFERRED = 'DEFERRED', // Отложено
	FINISHED = 'FINISHED', // Завершено
	CANCELLED = 'CANCELLED' // Отменено
}