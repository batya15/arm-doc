/**
 * Объект данного типа представляет интерфейс класса PagingResult
 */
export interface IPagingResultData {
	/**
	 * Флаг доступности других страниц для постраничного листания
	 */
	readonly morePagesAvailable: boolean;
	/**
	 * Номер страницы (zero-based)
	 */
	readonly pageNumber: number;
	/**
	 * Размер страницы
	 */
	readonly pageSize: number;
	/**
	 * Общее количество страниц
	 */
	readonly pageTotal: number;
}
