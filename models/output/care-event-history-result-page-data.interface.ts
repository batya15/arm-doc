import {IPagingResultData} from './paging-result-data.interface';
import {ICareEventHistoryRecordData} from './care-event-history-record-data';

/**
 * Описывает результат поиска в истории изменения статуса Клинического события
 */
export class ICareEventHistoryResultPageData {
	/**
	 * Запись в истории изменения статуса Клинического события
	 */
	readonly historyRecord: ICareEventHistoryRecordData [];
	/**
	 * Результат постраничного вывода данных
	 */
	readonly pagingResult: IPagingResultData;
}