import {CareEventTypes} from '../common/care-event-types.enum';
import {CompositeResourceTypes} from '@emias-kpi/kpi-resources/frontend/src/medical-organization-resources/models/resources/composite-resource-types.enum';
import {EntryTypes} from '../common/entry-types.enum';

/**
 * Описывает информацию о типе Клинического события (справочник типов клинических событий)
 */
export interface ICareEventTypesParamsData {
	/**
	 * Признак использования статуса DEFERRED для данного типа Клинического события
	 */
	readonly canBeDeferred: boolean;
	/**
	 * Тип Клинического события
	 */
	readonly careEventType: CareEventTypes;
	/**
	 * Тип Композитного ресурса для данного типа Клинического события
	 */
	readonly compositeResourceType: CompositeResourceTypes;
	/**
	 * Полное наименование типа Клинического события
	 */
	readonly description: string;
	/**
	 * Код класса документа СИМИ, используемого в качестве учетной формы для данного типа Клинического события
	 */
	readonly documentClassCode: number;
	/**
	 * Признак обязательности указания Записи на ресурс медицинской организации в реквизитах Клинического события для данного типа Клинического события
	 */
	readonly entryRequired: boolean;
	/**
	 * Тип записи на ресурс медицинской организации для данного типа Клинического события
	 */
	readonly entryType?: EntryTypes;
	/**
	 * Перечень ролей пользователей, для которых доступно использование данного типа Клинического события
	 */
	readonly userRoles: string[];
}