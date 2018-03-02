/* tslint:disable:max-line-length*/
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CareEventsConnector} from './connector/care-events.connector';
import {Observable} from 'rxjs/Observable';
import {ICreateCareEventResponse} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/ICreateCareEventResponse';
import {CareEventStatus} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/CareEventStatus';
import {ICareEvent} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/ICareEvent';
import {CareEventType} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/CareEventType';
import {ICareEventsResultPage} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/ICareEventsResultPage';
import {IGetCareEventsRequest} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/IGetCareEventsRequest';
import {IGetCareEventCancellationReasonsResponse} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/IGetCareEventCancellationReasonsResponse';
import {ICareEventCancellationReason} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/ICareEventCancellationReason';
import {IGetCareEventTypesParamsByUserRoleResponse} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/IGetCareEventTypesParamsByUserRoleResponse';
import {ICareEventTypesParams} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/ICareEventTypesParams';
import {IGetCareEventCancellationInfoResponse} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/IGetCareEventCancellationInfoResponse';
import {IAddBasicResourceToCareEventResponse} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/IAddBasicResourceToCareEventResponse';
import {IBasicResource} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/IBasicResource';
import {ICreateCareEventRequest} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/ICreateCareEventRequest';
import {ICreateCareEventParams} from './models/input/create-care-event-params.intarface';
import {ICareEventData} from './models/output/care-event-data.interface';
import {EntryTypes} from './models/common/entry-types.enum';
import {CareEventTypes} from './models/common/care-event-types.enum';
import {CareEventStatuses} from './models/common/care-event-statuses.enum';
import * as moment from 'moment';
import {IEntryData} from './models/common/entry-data.intarface';
import {ICareEventResultPageData} from './models/output/care-event-result-page-data';
import {IGetCareEventsByResourceResponse} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/IGetCareEventsByResourceResponse';
import {IGetCareEventsByPatientIdParams} from './models/input/get-care-events-by-patient-id-params.interface';
import {IGetCareEventsRequestParams} from './models/common/get-care-events-request.interface';
import {IPagingOptionsParams} from './models/input/paging-options-params.interface';
import {ConvertResourceHelper} from './convert-resource-helper';
import {IGetCareEventsByResourceParams} from './models/input/get-care-events-by-resource-params.interface';
import {BasicResource} from '@emias-kpi/kpi-resources/frontend/src/medical-organization-resources/models/resources/basic-resource.model';
import {ICareEventCancellationInfoData} from './models/output/care-event-cancellation-info-data.interface';
import {ICareEventTypesParamsData} from './models/output/care-event-types-params-data.interface';
import {CompositeResourceTypes} from '@emias-kpi/kpi-resources/frontend/src/medical-organization-resources/models/resources/composite-resource-types.enum';
import {IGetCareEventHistoryRequest} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/IGetCareEventHistoryRequest';
import {ICareEventHistoryResultPageData} from './models/output/care-event-history-result-page-data.interface';
import {IGetCareEventHistoryResponse} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/IGetCareEventHistoryResponse';
import {IGetCareEventTypesParamsResponse} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/IGetCareEventTypesParamsResponse';
import {BasicResourceType} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/BasicResourceType';
import {ICareEventCancellationReasonData} from './models/output/care-event-cancellation-reason-data.interface';
import {ExceptionInfo} from '@emias-kpi/core/frontend/src/core/exception/exception-info.model';
import {Exception} from '@emias-kpi/core/frontend/src/core/exception/exception.model';
import {ICareEventHistoryRecord} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/ICareEventHistoryRecord';
import {IGetCareEventsInfoRequest} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/get-care-events-info-request.interface.generated';
import {IGetCareEventsInfoResponse} from './connector/generated/emias/supp_careevents/v2/careeventsservice/types/get-care-events-info-response.interface.generated';


/* tslint:enable:max-line-length */

/**
 * Сервис для взаимодействия со стаканом ЕМИАС.СУПП.СОБЫТИЯ
 * Для его корректной работы необходима на тонком сервере
 * настроить обработку ошибок кодами 4** и 5**
 */
@Injectable()
export class CareEventsLibraryService {
	private connector: CareEventsConnector;

	constructor(http: HttpClient) {
		this.connector = new CareEventsConnector(http);
	}

	/**
	 * Создание клинического события
	 * Метод служит для создания нового клинического события заданного типа с атрибутами,
	 * определенными входными параметрами, и перевода его в статус Running (выполняется)
	 * @param {ICreateCareEventParams} careEvent
	 * @returns {Observable<ICareEventData>}
	 */
	public createCareEvent(careEvent: ICreateCareEventParams): Observable<ICareEventData> {
		const params: ICreateCareEventRequest = {
			careEventType: CareEventType[careEvent.careEventType.toString()],
			resource: ConvertResourceHelper.convertCompositeToRequest(careEvent.resource)
		};

		if (careEvent.info) {
			params.info = careEvent.info;
		}

		if (careEvent.patientId) {
			params.patientId = careEvent.patientId;
		}

		if (careEvent.entry) {
			params.entry = {
				entryId: careEvent.entry.entryId,
				entryType: EntryTypes[careEvent.entry.entryType.toString()]
			};
		}

		return this.connector.createCareEvent(params)
			.map((res: ICreateCareEventResponse) => CareEventsLibraryService.convertCareEvent(res));
	}

	/**
	 * Изменение статуса клинического события
	 * Метод служит для изменения статуса клинического события
	 * в соответствии со статусной моделью https://wiki.emias.mos.ru/pages/viewpage.action?pageId=11181056
	 * кроме статуса CANCELLED (отменено)
	 * @param {number} careEventId
	 * @param {CareEventStatuses} careEventStatus
	 * @returns {Observable<ICareEventData>}
	 */
	public setCareEventStatus(careEventId: number, careEventStatus: CareEventStatuses): Observable<ICareEventData> {
		return this.connector.setCareEventStatus({
			careEventId,
			careEventStatus: CareEventStatus[careEventStatus]
		}).map((res: ICreateCareEventResponse) => CareEventsLibraryService.convertCareEvent(res));
	}

	/**
	 * Отмена клинического события
	 * Метод служит для отмены ранее созданного клинического события
	 * @param {number} careEventId
	 * @param {number} cancelCode
	 * @param {string} info
	 * @returns {Observable<ICareEventData>}
	 */
	public cancelCareEvent(careEventId: number, cancelCode: number, info: string = ''): Observable<ICareEventData> {
		return this.connector.cancelCareEvent({careEventId, cancelCode, info})
			.map((res: ICreateCareEventResponse) => CareEventsLibraryService.convertCareEvent(res));
	}

	/**
	 * Метод служит для получения детальной информации о клиническом событии по его идентификатору,
	 * переданному во входящих параметрах
	 * @param {number} careEventId
	 * @returns {Observable<ICareEventData>}
	 */
	public getCareEventInfo(careEventId: number): Observable<ICareEventData> {
		return this.connector.getCareEventInfo({careEventId})
			.map((res: ICreateCareEventResponse) => CareEventsLibraryService.convertCareEvent(res));
	}

	/**
	 * Получение информации о клиническом событии по заданному набору поисковых атрибутов
	 * Метод служит для получения детальной информации о клиническом событии
	 * по заданному набору поисковых атрибутов, переданных во входящих параметрах
	 * @param {IGetCareEventsRequestParams} params
	 * @param {IPagingOptionsParams} pagingOptions
	 * @returns {Observable<ICareEventResultPageData>}
	 */
	public getCareEvents(params: IGetCareEventsRequestParams, pagingOptions: IPagingOptionsParams = null): Observable<ICareEventResultPageData> {
		return this.connector.getCareEvents(CareEventsLibraryService.parseAdditionalParams({}, params, pagingOptions))
			.map((res: IGetCareEventsByResourceResponse): ICareEventResultPageData => CareEventsLibraryService.getInstanceCareEventsPage({results: res.results}));
	}

	/**
	 * Получение информации о клиническом событии по заданному пациенту и набору поисковых атрибутов
	 * Метод служит для получения детальной информации о клиническом событии
	 * по заданному пациенту и набору поисковых атрибутов, переданных во входящих параметрах
	 * @param {IGetCareEventsByPatientIdParams} params
	 * @param {IPagingOptionsParams} pagingOptions
	 * @returns {Observable<ICareEventResultPageData>}
	 */
	public getCareEventsByPatientId(params: IGetCareEventsByPatientIdParams, pagingOptions: IPagingOptionsParams = null): Observable<ICareEventResultPageData> {
		return this.connector
			.getCareEventsByPatientId(CareEventsLibraryService.parseAdditionalParams({patientId: params.patientId}, params, pagingOptions))
			.map((res: IGetCareEventsByResourceResponse): ICareEventResultPageData => CareEventsLibraryService.getInstanceCareEventsPage({results: res.results}));
	}

	/**
	 * Получение информации о клиническом событии по заданному композитному ресурсу и набору поисковых атрибутов
	 * Метод служит для получения детальной информации о клиническом событии
	 * по заданному композитному ресурсу и набору поисковых атрибутов, переданных
	 * во входящих параметрах
	 * @param {IGetCareEventsByResourceParams} params
	 * @param {IPagingOptionsParams} pagingOptions
	 * @returns {Observable<ICareEventResultPageData>}
	 */
	public getCareEventsByResource(params: IGetCareEventsByResourceParams, pagingOptions: IPagingOptionsParams = null): Observable<ICareEventResultPageData> {
		return this.connector.getCareEventsByResource(
			CareEventsLibraryService.parseAdditionalParams({resource: ConvertResourceHelper.convertCompositeToRequest(params.resource)}, params, pagingOptions)
			).map((res: IGetCareEventsByResourceResponse) => CareEventsLibraryService.getInstanceCareEventsPage({results: res.results}))
			.catch((e: ExceptionInfo) => {
				if (e.getExceptions().every(i => i.getCode() === 'UE024')) {
					return Observable.of({
						careEvents: [],
						pagingResult: {
							morePagesAvailable: false,
							pageNumber: pagingOptions? pagingOptions.pageNumber : 0,
							pageSize: pagingOptions? pagingOptions.pageSize : 0,
							pageTotal: 0
						}
					})
				} else {
					return Observable.throw(e);
				}
			})
	}

	/**
	 * * Добавление вспомогательного базового ресурса
	 * Метод служит для добавления вспомогательного базового ресурса к композитному ресурсу клинического события
	 * todo: 1.4.4. Описание кодов ошибок
	 * @param {number} careEventId
	 * @param {IBasicResource} basicResource
	 * @returns {Observable<ICareEventData>}
	 */
	public addBasicResourceToCareEvent(careEventId: number, basicResource: BasicResource): Observable<ICareEventData> {
		return this.connector.addBasicResourceToCareEvent({careEventId, basicResource: {
			basicResourceId: basicResource.getResourceId(),
			determinant: basicResource.isDeterminant(),
			basicResourceType: BasicResourceType[basicResource.getType().toString()]
		}})
			.map((res: IAddBasicResourceToCareEventResponse) => CareEventsLibraryService.convertCareEvent(res));
	}

	/**
	 * Получение информации о причине отмены клинического события
	 * Метод служит для получения информации о причине отмены клинического события, идентификатор которого передан во входящих параметрах
	 * todo: 1.7.4.    Описание кодов ошибок
	 * @param {number} careEventId - Идентификатор  клинического события
	 * @returns {Observable<ICareEventCancellationInfoData>}
	 */
	public getCareEventCancellationInfo(careEventId: number): Observable<ICareEventCancellationInfoData> {
		return this.connector.getCareEventCancellationInfo({careEventId})
			.map((res: IGetCareEventCancellationInfoResponse) => {
				const result: ICareEventCancellationInfoData = {
					cancellationReason: CareEventsLibraryService.convertCancellationReason(res.careEventCancellationInfo.cancellationReason)
				};

				if (res.careEventCancellationInfo.info) {
					Object.assign(result, {info: res.careEventCancellationInfo.info});
				}

				return result;
			});
	}

	/**
	 * Получение справочника причины отмены клинических событий
	 * Метод служит для получения параметров из справочника причины отмены клинических событий
	 * todo 1.13.4.	Описание кодов ошибок
	 * @returns {Observable<ICareEventCancellationReasonData[]>}
	 */
	public getCareEventCancellationReasons(): Observable<ICareEventCancellationReasonData[]>  {
		return this.connector.getCareEventCancellationReasons({})
			.map((res: IGetCareEventCancellationReasonsResponse) => {
				if (res.cancelReason) {
					return res.cancelReason.map((cr: ICareEventCancellationReason) => CareEventsLibraryService.convertCancellationReason(cr));
				} else {
					throw CareEventsLibraryService.unexcludeError();
				}

			});
	}

	/**
	 * Получение типов клинических событий доступных по заданной роли пользователя
	 * Метод служит для получения параметров из справочника типов клинических событий по заданной роли пользователя
	 * todo: 1.12.4.	Описание кодов ошибок
	 * @param {string} userRole - Текстовое обозначение роли пользователя по справочнику
	 * @returns {Observable<ICareEventTypesParamsData[]>}
	 */
	public getCareEventTypesParamsByUserRole(userRole: string): Observable<ICareEventTypesParamsData[]> {
		return this.connector.getCareEventTypesParamsByUserRole({userRole})
			.map((res: IGetCareEventTypesParamsByUserRoleResponse) => {
				if (res.careEventTypeParam) {
					return res.careEventTypeParam.map((i: ICareEventTypesParams): ICareEventTypesParamsData => CareEventsLibraryService.convertTypesParamsData(i));
				} else {
					throw CareEventsLibraryService.unexcludeError();
				}

			});
	}


	/**
	 * Получение истории изменения статуса клинического события
	 * Метод служит для получения истории изменения статуса клинического события по его идентификатору, переданному во входящих параметрах
	 * todo: 1.6.4. Описание кодов ошибок
	 */
	public getCareEventHistory(careEventId: number, pagingOptions: IPagingOptionsParams = null): Observable<ICareEventHistoryResultPageData> {
		const params: IGetCareEventHistoryRequest = {careEventId};

		if (pagingOptions !== null) {
			params.pagingOptions = {
				pageSize: pagingOptions.pageSize,
				pageNumber: pagingOptions.pageNumber
			};
		}

		return this.connector.getCareEventHistory(params)
			.map((res: IGetCareEventHistoryResponse): ICareEventHistoryResultPageData => {
				return {
					historyRecord: res.careEventHistoryResultPage.historyRecord.map((i: ICareEventHistoryRecord) => ({
						careEventStatus: CareEventStatuses[i.value.toString()],
						timeStamp: moment(i.timeStamp)
					})),
					pagingResult: {
						pageSize: res.careEventHistoryResultPage.pageSize,
						morePagesAvailable: res.careEventHistoryResultPage.morePagesAvailable,
						pageTotal: res.careEventHistoryResultPage.pageTotal,
						pageNumber: res.careEventHistoryResultPage.pageNumber
					}
				};
			});
	}

	/**
	 * Получение справочника типов клинических событий
	 * Метод служит для получения параметров из справочника типов клинических событий
	 * todo: 1.11.4.	Описание кодов ошибок
	 * @returns {Observable<ICareEventTypesParamsData[]>}
	 */
	public getCareEventTypesParams(): Observable<ICareEventTypesParamsData[]> {
		return this.connector.getCareEventTypesParams({})
			.map((res: IGetCareEventTypesParamsResponse) => {
				return res.careEventTypeParam.map((i: ICareEventTypesParams): ICareEventTypesParamsData => CareEventsLibraryService.convertTypesParamsData(i));
			});
	}

	/**
	 * Список идентификаторов клинических событий
	 * Метод возвращает информацию о клинических событиях
	 * @param {IGetCareEventsInfoRequest} params
	 * @returns {Observable<IGetCareEventsInfoResponse>}
	 */
	public getCareEventsInfo(params: IGetCareEventsInfoRequest): Observable<IGetCareEventsInfoResponse> {
		return this.connector.getCareEventsInfo(params);
	}


	/**
	 * Возвращает инстанс страницы поиска клинических событий
	 * @param {{result: ICareEventsResultPage}} page
	 * @returns {ICareEventResultPageData}
	 */
	private static getInstanceCareEventsPage(page: {results: ICareEventsResultPage}): ICareEventResultPageData {
		if (page.results) {
			return {
				careEvents: page.results.careEvent
					.map((careEvent: ICareEvent): ICareEventData => CareEventsLibraryService.convertCareEvent({careEvent})),
				pagingResult: {
					morePagesAvailable: page.results.morePagesAvailable,
					pageNumber: page.results.pageNumber,
					pageSize: page.results.pageSize,
					pageTotal: page.results.pageTotal
				}
			};
		} else {
			throw CareEventsLibraryService.unexcludeError();
		}
	}

	/**
	 * Добавляет дополнительные параметры фильтрации к поисковому запросу
	 * @param {T} request
	 * @param {IGetCareEventsRequestParams} additional
	 * @param {IPagingOptionsParams} pagingOptions
	 * @returns {T}
	 */
	private static parseAdditionalParams<T, I extends IGetCareEventsRequest>
	(request: T, additional: IGetCareEventsRequestParams, pagingOptions: IPagingOptionsParams = null): I {
		const result: I = {} as I;
		Object.assign(result, request);

		if (additional !== null) {
			if (additional.start) {
				result.start = additional.start.valueOf().toString();
			}
			if (additional.end) {
				result.end = additional.end.valueOf().toString();
			}
			if (additional.careEventTypes) {
				result.careEventTypes = additional.careEventTypes
					.map((t: CareEventTypes) => CareEventType[t.toString()]);
			}
			if (additional.careEventStatuses) {
				result.careEventStatuses = additional.careEventStatuses
					.map((s: CareEventStatuses) => CareEventStatus[s.toString()]);
			}
		}

		if (pagingOptions !== null) {
			result.pagingOptions = {
				pageNumber: pagingOptions.pageNumber,
				pageSize: pagingOptions.pageSize
			};
		}

		return result;
	}

	/**
	 * Конвертирует КС из json от сервиса в объект для потребителя
	 * @param {{careEvent: ICareEvent}} src
	 * @returns {ICareEventData}
	 */
	private static convertCareEvent(src: {careEvent: ICareEvent}): ICareEventData {
		if (src.careEvent) {
			const result: ICareEventData = {
				careEventId: src.careEvent.careEventId,
				careEventType: CareEventTypes[src.careEvent.careEventType.toString()],
				careEventStatus: CareEventStatuses[src.careEvent.careEventStatus.toString()],
				careEventStarted: moment(src.careEvent.careEventStarted),
				patientId: src.careEvent.patientId,
				resource: ConvertResourceHelper.convertResponseToCompositeResource(src.careEvent.resource)
			};

			if (src.careEvent.careEventFinished) {
				Object.assign(result, {careEventFinished : moment(src.careEvent.careEventFinished)});
			}

			if (src.careEvent.entry) {
				const entry: IEntryData = {
					entryId: src.careEvent.entry.entryId,
					entryType: EntryTypes[src.careEvent.entry.entryType.toString()]
				};

				Object.assign(result, {entry : entry});
			}

			if (src.careEvent.info) {
				Object.assign(result, {info : src.careEvent.info});
			}

			return result;
		} else {
			throw CareEventsLibraryService.unexcludeError();
		}
	}

	/**
	 * Возвращает ошибку при парсинге объекта
	 * @param {Object} err
	 * @returns {ExceptionInfo}
	 */
	private static unexcludeError(err: Object = null): ExceptionInfo {
		return new ExceptionInfo(
			'CareEventsLibraryService',
			[new Exception({
				description: 'В ходе работы произошла непредвиденная ошибка',
				type: 'ERROR',
				isUserFriendly: true
			})]
		);
	}

	/**
	 * Конвертация причины отмены Клинического события из json в интерфейс для потребителя
	 * @param {ICareEventCancellationReason} src
	 * @returns {ICareEventCancellationReasonData}
	 */
	private static convertCancellationReason(src: ICareEventCancellationReason): ICareEventCancellationReasonData {
		const result: ICareEventCancellationReasonData = {
			code: src.code,
			description: src.description
		};

		if (src.details) {
			Object.assign(result, {details: CareEventsLibraryService.convertCancellationReason(src.details)});
		}

		return result;
	}

	/**
	 * Конвертация json в описывает информации о типе Клинического события в интерфейс для потребителя
	 * @param {ICareEventTypesParams} src
	 * @returns {ICareEventTypesParamsData}
	 */
	private static convertTypesParamsData(src: ICareEventTypesParams): ICareEventTypesParamsData {
		const result: ICareEventTypesParamsData = {
			canBeDeferred: src.canBeDeferred,
			careEventType: CareEventTypes[src.careEventType.toString()],
			compositeResourceType: CompositeResourceTypes[src.compositeResourceType.toString()],
			description: src.description,
			documentClassCode: src.documentClassCode,
			entryRequired: src.entryRequired,
			userRoles: src.userRoles.userRole,
		};

		if (src.entryType) {
			Object.assign(result, {entryType: EntryTypes[src.entryType.toString()]})
		}

		return result;
	}
}
