/* tslint:disable */
import { ICareEventTypesParams$UserRoles } from './ICareEventTypesParams$UserRoles';
import { EntryType } from './EntryType';
import { CompositeResourceType } from './CompositeResourceType';
import { CareEventType } from './CareEventType';



/**
 *  
 */
export interface ICareEventTypesParams {
	
	description: string; //
	userRoles?: ICareEventTypesParams$UserRoles; //
	documentClassCode?: number; //
	careEventType: CareEventType; //
	canBeDeferred: boolean; //
	compositeResourceType: CompositeResourceType; //
	entryType?: EntryType; //
	entryRequired: boolean; //
}
/* tslint:enable */
