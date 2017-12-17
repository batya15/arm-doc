import {IGetCareEventsRequestParams} from '../common/get-care-events-request.interface';

/**
 * Вспомогательный интерфейс для описания входящих параметров метода getCareEventsByPatient
 */
export interface IGetCareEventsByPatientIdParams extends IGetCareEventsRequestParams {
	/**
	 * Идентификатор  пациента
	 */
	patientId: number;

}