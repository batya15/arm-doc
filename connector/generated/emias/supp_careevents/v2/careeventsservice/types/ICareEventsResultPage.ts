/* tslint:disable */
import { IPagingResults } from './IPagingResults';
import { ICareEvent } from './ICareEvent';



/**
 *  
 */
export interface ICareEventsResultPage extends IPagingResults {
	
	careEvent?: ICareEvent[]; //
}
/* tslint:enable */
