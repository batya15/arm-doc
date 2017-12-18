import {ICareEvent} from "./care-event.interface";
export interface ICareEventProvider {
    getCareEvent(): ICareEvent
}