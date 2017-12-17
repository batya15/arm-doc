import {ICareEventCancellationReasonData} from './care-event-cancellation-reason-data.interface';

/**
 * Описывает информацию о причине отмены Клинического события (отмена конкретного Клинического события)
 */
export class ICareEventCancellationInfoData {
	/**
	 * Причина отмены Клинического события
	 */
	readonly cancellationReason: ICareEventCancellationReasonData;
	/**
	 * Комментарий, дополнительная информация, введенная пользователем при отмене Клинического события
	 */
	readonly info?: string;

}