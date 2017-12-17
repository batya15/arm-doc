import {CareEventStatuses} from './care-event-statuses.enum';
import {CareEventTypes} from './care-event-types.enum';
import {Moment} from 'moment';

export interface IGetCareEventsRequestParams {
	/**
	 * Статусы Клинического события
	 */
	careEventStatuses?: CareEventStatuses [];
	/**
	 * Тип Клинического события
	 */
	careEventTypes?: CareEventTypes[];
	/**
	 * Начало временно интервала
	 */
	start?: Moment;
	/**
	 * Окончание временного интервала
	 */
	end?: Moment;
}