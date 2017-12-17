import {EntryTypes} from './entry-types.enum';

/**
 * Описывает Запись на ресурс медицинской организации
 */
export interface IEntryData {
	/**
	 * Идентификатор Записи на ресурс медицинской организации
	 */
	entryId: number;
	/**
	 * Тип Записи на ресурс медицинской организации
	 */
	entryType: EntryTypes
}