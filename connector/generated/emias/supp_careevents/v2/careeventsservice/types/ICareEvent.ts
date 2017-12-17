/* tslint:disable */
import { IEntry } from './IEntry';
import { CareEventStatus } from './CareEventStatus';
import { IResource } from './IResource';
import { CareEventType } from './CareEventType';



/**
 *  
 */
export interface ICareEvent {
	
	patientId?: number; //
	resource: IResource; //
	entry?: IEntry; //
	info?: string; //
	careEventId: number; //
	careEventType: CareEventType; //
	careEventStatus: CareEventStatus; //
	careEventStarted: string; //
	careEventFinished?: string; //
}
/* tslint:enable */
