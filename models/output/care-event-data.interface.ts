import {CareEventTypes} from '../common/care-event-types.enum';
import {Moment} from 'moment';
import {IEntryData} from '../common/entry-data.intarface';
import {CareEventStatuses} from '../common/care-event-statuses.enum';
import {CompositeResource} from '@emias-kpi/kpi-resources/frontend/src/medical-organization-resources/models/resources/composite-resource.model';


/**
 * Описывает Клиническое событие
 */
export interface ICareEventData {
	/**
	 * Идентификатор клинического события
	 */
	readonly careEventId: number;

	/**
	 * Тип клинического события
	 */
	readonly careEventType: CareEventTypes;

	/**
	 * Статус клинического события
	 */
	readonly careEventStatus: CareEventStatuses;

	/**
	 * Дата и время начала клинического события
	 */
	readonly careEventStarted: Moment;

	/**
	 * Дата и время окончания клинического события
	 */
	readonly careEventFinished?: Moment;

	/**
	 * Идентификатор пациента
	 */
	readonly patientId: number;

	/**
	 * Ресурс медицинской организации
	 */
	readonly resource: CompositeResource;

	/**
	 * Запись на ресурс медицинской организации
	 */
	readonly entry?: IEntryData;

	/**
	 * Комментарий. Дополнительная информация
	 */
	readonly info?: string;
}