/* tslint:disable */
import { CareEventStatus } from './CareEventStatus';
import { IPagingOptions } from './IPagingOptions';
import { IResource } from './IResource';
import { CareEventType } from './CareEventType';



/**
 *  
 */
export interface IGetCareEventsByResourceRequest {
	
	resource: IResource; //
	start?: string; //
	end?: string; //
	careEventTypes?: CareEventType[]; //
	careEventStatuses?: CareEventStatus[]; //
	pagingOptions?: IPagingOptions; //
}
/* tslint:enable */
