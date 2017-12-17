import {IResource} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/IResource';
import {
	IAvailableResource$BasicResources$DeterminantBasicResource
} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/IAvailableResource$BasicResources$DeterminantBasicResource';
import {CompositeResourceType} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/CompositeResourceType';
import {BasicResourceType} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/BasicResourceType';
import {LocationTypes} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/LocationTypes';
import {IComplexLocation} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/IComplexLocation';
import {ISimpleLocation} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/ISimpleLocation';
import {CompositeResource} from '@emias-kpi/kpi-resources/frontend/src/medical-organization-resources/models/resources/composite-resource.model';
import {AvailableResource, IAvailableResource} from '@emias-kpi/kpi-resources/frontend/src/medical-organization-resources/models/resources/available-resource.model';
import {AddressLocation} from '@emias-kpi/kpi-resources/frontend/src/medical-organization-resources/models/resources/address-location.model';
import {ComplexLocation} from '@emias-kpi/kpi-resources/frontend/src/medical-organization-resources/models/resources/complex-location.model';
import {SpecialAvailableResource} from '@emias-kpi/kpi-resources/frontend/src/medical-organization-resources/models/resources/special-available-resource.model';
import {SimpleLocation} from '@emias-kpi/kpi-resources/frontend/src/medical-organization-resources/models/resources/simple-location.model';
import {BasicResource} from '@emias-kpi/kpi-resources/frontend/src/medical-organization-resources/models/resources/basic-resource.model';
import {BasicResourceTypes} from '@emias-kpi/kpi-resources/frontend/src/medical-organization-resources/models/resources/basic-resource-types.enum';

export class ConvertResourceHelper {

	/**
	 * Преобразование CompositeResource в IResource для отправки на сервис СУПП.События
	 * @param {CompositeResource} resource
	 * @returns {IResource}
	 */
	public static convertCompositeToRequest(resource: CompositeResource): IResource {
		const result: IResource = {};
		if (resource instanceof AvailableResource) {
			result.availableResource = {
				compositeResourceId: resource.getResourceId(),
				compositeResourceType: CompositeResourceType[resource.getType().toString()],
				basicResources: {
					determinantBasicResource: ConvertResourceHelper.convertMainBasicResourceToRequest(resource.getBasicResources().find(i => i.isDeterminant())),
					basicResource: resource.getBasicResources().filter(i => !i.isDeterminant()).map(b => ConvertResourceHelper.convertMainBasicResourceToRequest(b))
				}
			};

			if (resource.getLocation()) {
				if (resource.getLocation() instanceof AddressLocation) {
					result.availableResource.addressLocation = {
						address: (<AddressLocation>(resource.getLocation())).getAddress(),
						locationType: LocationTypes[resource.getLocation().getType().toString()]
					};
				}
				if (resource.getLocation() instanceof ComplexLocation) {
					const complexLocation: IComplexLocation = {
						locationType: LocationTypes[resource.getLocation().getType().toString()],
					};

					if ((<ComplexLocation>(resource.getLocation())).getRoomId()) {
						complexLocation.roomId = (<ComplexLocation>(resource.getLocation())).getRoomId()
					}

					if ((<ComplexLocation>(resource.getLocation())).getComplexResourceId()) {
						complexLocation.complexResourceId = (<ComplexLocation>(resource.getLocation())).getComplexResourceId()
					}
					result.availableResource.complexLocation = complexLocation;
				}

			}

		} else if (resource instanceof SpecialAvailableResource) {
			const location: ISimpleLocation = {
				locationType: LocationTypes.SIMPLE_LOCATION,
			};
			if (resource.getLocation() instanceof SimpleLocation) {
				location.roomId = (<SimpleLocation>(resource.getLocation())).getRoomId()
			}
			result.specialAvailableResource = {
				simpleLocation: location,
				basicResources: {
					determinantBasicResource: ConvertResourceHelper.convertMainBasicResourceToRequest(resource.getBasicResources().find(i => i.isDeterminant())),
					basicResource: resource.getBasicResources().filter(i => !i.isDeterminant()).map(b => ConvertResourceHelper.convertMainBasicResourceToRequest(b))
				},
				compositeResourceId: resource.getResourceId(),
				compositeResourceType: CompositeResourceType[resource.getType().toString()],
			};
		}

		return result;
	}

	/**
	 * Конвертация json в compositeResource
	 * @param {IResource} src
	 * @returns {CompositeResource}
	 */
	public static convertResponseToCompositeResource(src: IResource): CompositeResource {
		let result: CompositeResource = null;

		if (src.availableResource) {
			const initParams: IAvailableResource = {
				resourceId: src.availableResource.compositeResourceId,
				basicResources : []
			};

			if (src.availableResource.complexLocation) {
				initParams.location = new ComplexLocation({
					roomId: src.availableResource.complexLocation.roomId,
					complexResourceId: src.availableResource.complexLocation.complexResourceId
				});
			}

			if (src.availableResource.addressLocation) {
				initParams.location = new AddressLocation(src.availableResource.addressLocation.address)
			}

			if (src.availableResource.basicResources && src.availableResource.basicResources.determinantBasicResource) {
				initParams.basicResources.concat([new BasicResource({
					type: BasicResourceTypes[src.availableResource.basicResources.determinantBasicResource.basicResourceType.toString()],
					resourceId: src.availableResource.basicResources.determinantBasicResource.basicResourceId,
					determinant: src.availableResource.basicResources.determinantBasicResource.determinant,
				})]);
			}

			if (src.availableResource.basicResources && src.availableResource.basicResources.basicResource) {
				initParams.basicResources.concat(
					src.availableResource.basicResources.basicResource.map(i => new BasicResource({
						type: BasicResourceTypes[i.basicResourceType.toString()],
						resourceId: i.basicResourceId,
						determinant: i.determinant,
					}))
				);
			}

			result = new AvailableResource(initParams);
		}

		return result;
	}

	/**
	 * Конвертация базового ресурса в json для запроса на сервер
	 * @returns {IAvailableResource$BasicResources$DeterminantBasicResource}
	 */
	public static convertMainBasicResourceToRequest(basicResource: BasicResource): IAvailableResource$BasicResources$DeterminantBasicResource {
		return {
			basicResourceId: basicResource.getResourceId(),
			basicResourceType: BasicResourceType[basicResource.getType().toString()],
			determinant: basicResource.isDeterminant(),
		}
	}

}