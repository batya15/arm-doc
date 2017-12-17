import {IPagingResultData} from './paging-result-data.interface';
import {ICareEventData} from './care-event-data.interface';

/**
 * Описывает результат поиска клинических событий
 */
export interface ICareEventResultPageData {
	/**
	 * Найденные Клинические события
	 */
	readonly careEvents: ReadonlyArray<ICareEventData>;
	/**
	 Результат постраничного вывода данных
	 */
	readonly pagingResult: IPagingResultData;
}
