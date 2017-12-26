import {EntryTypes} from "./entry-types.enum";
/**
 * Определяет набор требований к реализации типа, рассматриваемого в качестве Записи на ресурс медицинской организации.
 */
export interface ICareEventEntry {
	/**
	 * Предоставляют доступ к идентификатору Записи на ресурс
	 * @returns {number}
	 */
	getEntryId(): number;

	/**
	 * Предоставляет доступ к типу Записи на ресурс
	 * @returns {EntryTypes}
	 */
	getEntryType(): EntryTypes;

}
