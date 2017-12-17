/* tslint:disable */
import { IPagingResults } from './IPagingResults';
import { ICareEventHistoryRecord } from './ICareEventHistoryRecord';



/**
 *  
 */
export interface ICareEventHistoryResultPage extends IPagingResults {
	
	historyRecord: ICareEventHistoryRecord[]; //
}
/* tslint:enable */
