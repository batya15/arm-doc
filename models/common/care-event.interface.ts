import { CareEventStatuses } from './care-event-statuses.enum';
import { Moment } from 'moment/moment';

/**
 * Определяет набор требований к реализации типа, рассматриваемого в качестве Клинического события.
 */
export interface ICareEvent {
    getCareEventId(): number; // Предоставляют доступ к идентификатору Клинического события.
    getCareEventStatus(): CareEventStatuses; // Предоставляет доступ к статусу Клинического события
    getCareEventStarted(): Moment; // Предоставляет доступ к времени начала Клинического события
    getPatientId(): number; // Предоставляет доступ к идентификатору Пациента, связанного с клиническим событием.
}
