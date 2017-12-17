import {CareEventStatuses} from '../common/care-event-statuses.enum';
import {CareEventTypes} from '../common/care-event-types.enum';
import {Moment} from 'moment';
import {CompositeResource} from '@emias-kpi/kpi-resources/frontend/src/medical-organization-resources/models/resources/composite-resource.model';

/**
 * Вспомогательный интерфейс для описания входящих параметров метода getCareEventsByResource
 */
export interface IGetCareEventsByResourceParams {
	/**
	 * Статус Клинического события
	 */
	careEventStatuses?: CareEventStatuses [];
	/**
	 * Тип Клинического события
	 */
	careEventTypes?: CareEventTypes [];
	/**
	 * Начало временно интервала
	 */
	start?: Moment;
	/**
	 * Окончание временного интервала
	 */
	end?: Moment;
	/**
	 * Ресурс медицинской организации
	 */
	resource: CompositeResource;
}