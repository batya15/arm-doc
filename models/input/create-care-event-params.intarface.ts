import {CareEventTypes} from '../common/care-event-types.enum';
import {IEntryData} from '../common/entry-data.intarface';
import {CompositeResource} from '@emias-kpi/kpi-resources/frontend/src/medical-organization-resources/models/resources/composite-resource.model';


/**
 * Вспомогательный интерфейс для описания входящих параметров метода createCareEvent
 */
export interface ICreateCareEventParams {
	/**
	 * Тип Клинического события
	 */
	careEventType: CareEventTypes;
	/**
	 * Идентификатор пациента
	 */
	patientId: number;
	/**
	 * Комментарий. Дополнительная информация
	 */
	info?: string;
	/**
	 * Запись на ресурс медицинской организации
	 */
	entry?: IEntryData;

	/**
	 * Ресурс медицинской организации
	 */
	resource: CompositeResource;
}