/* tslint:disable */
import { IEntry } from './IEntry';
import { IResource } from './IResource';
import { CareEventType } from './CareEventType';



/**
 *  
 */
export interface ICreateCareEventRequest {
	
	careEventType: CareEventType; //
	patientId?: number; //
	resource: IResource; //
	entry?: IEntry; //
	info?: string; //
}
/* tslint:enable */
