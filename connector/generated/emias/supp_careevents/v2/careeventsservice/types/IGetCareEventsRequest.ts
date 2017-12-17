/* tslint:disable */
import { CareEventStatus } from './CareEventStatus';
import { IPagingOptions } from './IPagingOptions';
import { CareEventType } from './CareEventType';



/**
 *  
 */
export interface IGetCareEventsRequest {
	
	start?: string; //
	end?: string; //
	careEventTypes?: CareEventType[]; //
	careEventStatuses?: CareEventStatus[]; //
	pagingOptions?: IPagingOptions; //
}
/* tslint:enable */
