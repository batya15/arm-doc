/**
 * Описывает информацию о причине отмены Клинического события (справочник причин)
 */
export interface ICareEventCancellationReasonData {
	/**
	 * Код причины отмены
	 */
	readonly code: number;
	/**
	 * Описание причины отмены
	 */
	readonly description: string;
	/**
	 * Информацию о причине отмены Клинического события (справочник причин)
	 */
	readonly details?: ICareEventCancellationReasonData;
}