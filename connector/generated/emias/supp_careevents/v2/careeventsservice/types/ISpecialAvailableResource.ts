/* tslint:disable */
import { ISpecialAvailableResource$BasicResources } from './ISpecialAvailableResource$BasicResources';
import { CompositeResourceType } from './CompositeResourceType';
import { ICompositeResource } from './ICompositeResource';
import { ISimpleLocation } from './ISimpleLocation';



/**
 *  
 */
export interface ISpecialAvailableResource extends ICompositeResource {
	
	simpleLocation: ISimpleLocation; //
	basicResources: ISpecialAvailableResource$BasicResources; //
	compositeResourceType: CompositeResourceType; //
}
/* tslint:enable */
