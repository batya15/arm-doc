/**
 * Описывает тип клинического события (строковой набор для создания нового клинического события,
 * а также для вывода в блоке информации о ранее созданном клиническом событии)
 */
export enum CareEventTypes {
	MEETING_WITH_DOCTOR = 'MEETING_WITH_DOCTOR', /* (тип 1.1) Прием пациента врачом-клиницистом (фельдшером, акушером); */
	MEETING_WITH_DUTY_DOCTOR = 'MEETING_WITH_DUTY_DOCTOR', /* (тип 1.2) Прием пациента дежурным врачом (фельдшером); */
	WORK_WITH_PATIENT_WITHOUT_MEETING = 'WORK_WITH_PATIENT_WITHOUT_MEETING', /* (тип 1.3) Работа врача (фельдшера, акушера) с пациентом вне приема; */
	MEETING_WITH_DOCTOR_AT_HOME = 'MEETING_WITH_DOCTOR_AT_HOME', /* (тип 2.1) Вызов врача на дом; */
	CONDUCTING_DIAGNOSTIC_TEST = 'CONDUCTING_DIAGNOSTIC_TEST', /* (тип 6.1) Проведение инструментального исследования; */
	DESCRIBING_DIAGNOSTIC_TEST = 'DESCRIBING_DIAGNOSTIC_TEST' /* (тип 6.2) Описание результатов инструментального исследования */
}