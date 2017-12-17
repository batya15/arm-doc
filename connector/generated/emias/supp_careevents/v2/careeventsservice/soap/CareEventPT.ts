/* tslint:disable */
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import { IGetCareEventTypesParamsByUserRoleResponse } from '../types/IGetCareEventTypesParamsByUserRoleResponse';
import { IGetCareEventInfoRequest } from '../types/IGetCareEventInfoRequest';
import { IGetCareEventsRequest } from '../types/IGetCareEventsRequest';
import { IGetCareEventCancellationReasonsRequest } from '../types/IGetCareEventCancellationReasonsRequest';
import { ICreateCareEventRequest } from '../types/ICreateCareEventRequest';
import { IGetCareEventTypesParamsByUserRoleRequest } from '../types/IGetCareEventTypesParamsByUserRoleRequest';
import { ISetCareEventStatusRequest } from '../types/ISetCareEventStatusRequest';
import { ICancelCareEventRequest } from '../types/ICancelCareEventRequest';
import { IGetCareEventCancellationInfoRequest } from '../types/IGetCareEventCancellationInfoRequest';
import { IGetCareEventInfoResponse } from '../types/IGetCareEventInfoResponse';
import { IGetCareEventHistoryResponse } from '../types/IGetCareEventHistoryResponse';
import { IGetCareEventsByPatientIdResponse } from '../types/IGetCareEventsByPatientIdResponse';
import { IGetCareEventsResponse } from '../types/IGetCareEventsResponse';
import { IGetCareEventCancellationInfoResponse } from '../types/IGetCareEventCancellationInfoResponse';
import { IGetCareEventsByPatientIdRequest } from '../types/IGetCareEventsByPatientIdRequest';
import { IGetCareEventHistoryRequest } from '../types/IGetCareEventHistoryRequest';
import { ISetCareEventStatusResponse } from '../types/ISetCareEventStatusResponse';
import { IGetCareEventsByResourceRequest } from '../types/IGetCareEventsByResourceRequest';
import { ICreateCareEventResponse } from '../types/ICreateCareEventResponse';
import { ICancelCareEventResponse } from '../types/ICancelCareEventResponse';
import { IGetCareEventTypesParamsRequest } from '../types/IGetCareEventTypesParamsRequest';
import { IGetCareEventsByResourceResponse } from '../types/IGetCareEventsByResourceResponse';
import { IAddBasicResourceToCareEventResponse } from '../types/IAddBasicResourceToCareEventResponse';
import { IAddBasicResourceToCareEventRequest } from '../types/IAddBasicResourceToCareEventRequest';
import { IGetCareEventTypesParamsResponse } from '../types/IGetCareEventTypesParamsResponse';
import { IGetCareEventCancellationReasonsResponse } from '../types/IGetCareEventCancellationReasonsResponse';



export abstract class CareEventPT<T> {

	protected abstract path: string;
	protected abstract parseError(response: any, canceled?: boolean): T;
	constructor(protected http: HttpClient) {
	}
	
	public getCareEventTypesParamsByUserRole(params: IGetCareEventTypesParamsByUserRoleRequest): Observable<IGetCareEventTypesParamsByUserRoleResponse> {
		return this.http.request<IGetCareEventTypesParamsByUserRoleResponse>('POST', this.path + '/getCareEventTypesParamsByUserRole.api', {body: params})
		.catch(err => Observable.throw(this.parseError(err)));
	}


	public createCareEvent(params: ICreateCareEventRequest): Observable<ICreateCareEventResponse> {
		return this.http.request<ICreateCareEventResponse>('POST', this.path + '/createCareEvent.api', {body: params})
		.catch(err => Observable.throw(this.parseError(err)));
	}


	public getCareEvents(params: IGetCareEventsRequest): Observable<IGetCareEventsResponse> {
		return this.http.request<IGetCareEventsResponse>('POST', this.path + '/getCareEvents.api', {body: params})
		.catch(err => Observable.throw(this.parseError(err)));
	}


	public getCareEventInfo(params: IGetCareEventInfoRequest): Observable<IGetCareEventInfoResponse> {
		return this.http.request<IGetCareEventInfoResponse>('POST', this.path + '/getCareEventInfo.api', {body: params})
		.catch(err => Observable.throw(this.parseError(err)));
	}


	public cancelCareEvent(params: ICancelCareEventRequest): Observable<ICancelCareEventResponse> {
		return this.http.request<ICancelCareEventResponse>('POST', this.path + '/cancelCareEvent.api', {body: params})
		.catch(err => Observable.throw(this.parseError(err)));
	}


	public getCareEventCancellationInfo(params: IGetCareEventCancellationInfoRequest): Observable<IGetCareEventCancellationInfoResponse> {
		return this.http.request<IGetCareEventCancellationInfoResponse>('POST', this.path + '/getCareEventCancellationInfo.api', {body: params})
		.catch(err => Observable.throw(this.parseError(err)));
	}


	public addBasicResourceToCareEvent(params: IAddBasicResourceToCareEventRequest): Observable<IAddBasicResourceToCareEventResponse> {
		return this.http.request<IAddBasicResourceToCareEventResponse>('POST', this.path + '/addBasicResourceToCareEvent.api', {body: params})
		.catch(err => Observable.throw(this.parseError(err)));
	}


	public getCareEventsByPatientId(params: IGetCareEventsByPatientIdRequest): Observable<IGetCareEventsByPatientIdResponse> {
		return this.http.request<IGetCareEventsByPatientIdResponse>('POST', this.path + '/getCareEventsByPatientId.api', {body: params})
		.catch(err => Observable.throw(this.parseError(err)));
	}


	public getCareEventHistory(params: IGetCareEventHistoryRequest): Observable<IGetCareEventHistoryResponse> {
		return this.http.request<IGetCareEventHistoryResponse>('POST', this.path + '/getCareEventHistory.api', {body: params})
		.catch(err => Observable.throw(this.parseError(err)));
	}


	public setCareEventStatus(params: ISetCareEventStatusRequest): Observable<ISetCareEventStatusResponse> {
		return this.http.request<ISetCareEventStatusResponse>('POST', this.path + '/setCareEventStatus.api', {body: params})
		.catch(err => Observable.throw(this.parseError(err)));
	}


	public getCareEventCancellationReasons(params: IGetCareEventCancellationReasonsRequest): Observable<IGetCareEventCancellationReasonsResponse> {
		return this.http.request<IGetCareEventCancellationReasonsResponse>('POST', this.path + '/getCareEventCancellationReasons.api', {body: params})
		.catch(err => Observable.throw(this.parseError(err)));
	}


	public getCareEventsByResource(params: IGetCareEventsByResourceRequest): Observable<IGetCareEventsByResourceResponse> {
		return this.http.request<IGetCareEventsByResourceResponse>('POST', this.path + '/getCareEventsByResource.api', {body: params})
		.catch(err => Observable.throw(this.parseError(err)));
	}


	public getCareEventTypesParams(params: IGetCareEventTypesParamsRequest): Observable<IGetCareEventTypesParamsResponse> {
		return this.http.request<IGetCareEventTypesParamsResponse>('POST', this.path + '/getCareEventTypesParams.api', {body: params})
		.catch(err => Observable.throw(this.parseError(err)));
	}
	

}

/* tslint:enable */
