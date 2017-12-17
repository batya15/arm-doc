/* tslint:disable */
import { IAddressLocation } from './IAddressLocation';
import { IAvailableResource$BasicResources } from './IAvailableResource$BasicResources';
import { CompositeResourceType } from './CompositeResourceType';
import { ICompositeResource } from './ICompositeResource';
import { IComplexLocation } from './IComplexLocation';



/**
 *  
 */
export interface IAvailableResource extends ICompositeResource {
	
	addressLocation?: IAddressLocation; //
	complexLocation?: IComplexLocation; //
	basicResources: IAvailableResource$BasicResources; //
	compositeResourceType: CompositeResourceType; //
}
/* tslint:enable */
