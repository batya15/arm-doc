import {CareEventStatuses} from '../common/care-event-statuses.enum';
import {Moment} from 'moment';

/**
 * Описывает одну строку в истории изменения статуса
 */
export interface ICareEventHistoryRecordData {
	/**
	 * Статус Клинического события
	 */
	readonly careEventStatus: CareEventStatuses;
	/**
	 * Время изменения статуса Клинического события
	 */
	readonly timeStamp: Moment;
}