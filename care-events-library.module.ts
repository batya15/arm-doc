import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {CareEventsLibraryService} from './care-events-library.service';
import {MedicalOrganizationResourcesModule} from '@emias-kpi/kpi-resources/frontend/src/medical-organization-resources/medical-organization-resources.module';

/**
 * Модуль для взаимодействия со стаканом События
 */
@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		MedicalOrganizationResourcesModule
	],
	providers: [
		CareEventsLibraryService
	],
})
export class CareEventsLibraryModule {
}
