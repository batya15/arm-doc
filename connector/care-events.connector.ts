import {IException} from '@emias-kpi/core/frontend/src/core/exception/exception.interface';
import {ExceptionInfo} from '@emias-kpi/core/frontend/src/core/exception/exception-info.model';
import {HttpErrorResponse} from '@angular/common/http';
import {Exception} from '@emias-kpi/core/frontend/src/core/exception/exception.model';
import {CareEventPT} from "./generated/emias/supp_careevents/v2/careeventsservice/soap/CareEventPT";


const errorMessages: ReadonlyMap<string, IException> = new Map<string, IException>([
	['E001', {
		description: 'Недостаточно прав для выполнения данной операции',
		type: 'ERROR',
		isUserFriendly: true
	}],
	['E002', {
		description: 'В процессе работы произошла неизвестная ошибка',
		type: 'ERROR',
		isUserFriendly: true
	}],
	['UE003', {
		description: 'Указанный тип клинического события не существует',
		type: 'ERROR',
		isUserFriendly: true
	}],
	['UE004', {
		description: 'Для указанного ресурса медицинской организации на данный момент уже существует клиническое событие в статусе «Выполняется»',
		type: 'ERROR',
		isUserFriendly: true
	}],
	['UE005', {
		description: 'Для указанного ИД роли не найдено доступных типов клинического события',
		type: 'ERROR',
		isUserFriendly: false
	}],
	['UE006', {
		description: 'Для указанного наименования роли не найдено доступных типов клинического события',
		type: 'ERROR',
		isUserFriendly: true
	}],
	['UE007', {
		description: 'Не указан тип записи на ресурс медицинской организации',
		type: 'ERROR',
		isUserFriendly: true
	}],
	['UE008', {
		description: 'Тип записи на ресурс медицинской организации указан некорректно',
		type: 'ERROR',
		isUserFriendly: true
	}],
	['UE009', {
		description: 'Тип композитного ресурса указан некорректно',
		type: 'ERROR',
		isUserFriendly: true
	}],
	['UE010', {
		description: 'Тип локации композитного ресурса указан некорректно',
		type: 'ERROR',
		isUserFriendly: true
	}],
	['UE011', {
		description: 'Параметры локации заданного типа указаны некорректно',
		type: 'ERROR',
		isUserFriendly: true
	}],
	['UE012', {
		description: 'Некорректный тип определяющего базового ресурса',
		type: 'ERROR',
		isUserFriendly: true
	}],
	['UE013', {
		description: 'Не корректный тип вспомогательного базового ресурса',
		type: 'ERROR',
		isUserFriendly: true
	}],
	['UE014', {
		description: 'Клиническое событие с указанным идентификатором  не существует',
		type: 'ERROR',
		isUserFriendly: false
	}],
	['UE015', {
		description: 'Указанное клиническое событие было завершено или отменено ранее',
		type: 'ERROR',
		isUserFriendly: true
	}],
	['UE016', {
		description: 'Изменять статус или отменять клиническое событие может только сотрудник создавший клиническое событие',
		type: 'ERROR',
		isUserFriendly: true
	}],
	['UE017', {
		description: 'Заданный статус должен отличаться от текущего статуса клинического события',
		type: 'ERROR',
		isUserFriendly: true
	}],
	['UE018', {
		description: 'Клиническое событие данного типа  не предполагает его откладывание',
		type: 'ERROR',
		isUserFriendly: true
	}],
	['UE019', {
		description: 'Причина отмены с указанным идентификатором не существует',
		type: 'ERROR',
		isUserFriendly: false
	}],
	['UE020', {
		description: 'Добавление вспомогательного базового ресурса возможно только Клиническому событию в статусе «Выполняется»',
		type: 'ERROR',
		isUserFriendly: false
	}],
	['UE021', {
		description: 'Размер страницы для вывода данных должен соответствовать условию  0 <  pageSize <= 100',
		type: 'ERROR',
		isUserFriendly: false
	}],
	['UE022', {
		description: 'Указанный номер страницы превышает максимальное значение при заданном размере страницы',
		type: 'ERROR',
		isUserFriendly: true
	}],
	['UE023', {
		description: 'Получить информацию о причине отмены клинического события можно только в статусе «Отменено»',
		type: 'ERROR',
		isUserFriendly: true
	}],
	['UE024', {
		description: 'По заданным поисковым параметрам не найдено ни одного клинического события',
		type: 'ERROR',
		isUserFriendly: true
	}],
	['UE025', {
		description: 'Необходимо указать хотя бы один поисковый атрибут',
		type: 'ERROR',
		isUserFriendly: true
	}],
	['DEFAULT', {
		code: 'UNKNOWN',
		description: 'Непредвиденная ошибка',
		type: 'ERROR',
		isUserFriendly: true
	}],

]);

/**
 * Коннектор к стакану события - реализует взаимодействия с сервером и разбор ошибки
 * {@Link http://osb.emias.dzm.lanit.ru/CareEvents/CareEventsService/v2S/ProxyService?wsdl WSDL}
 */
export class CareEventsConnector extends CareEventPT<ExceptionInfo> {
	public path: string = 'careevents';

	protected parseError(response: HttpErrorResponse, canceled: boolean = false): ExceptionInfo {
		let error: IException = null;
		let code: string = 'DEFAULT';

		if (response && response.error) {
			let errParse: { faultInfo?: { code?: string } } = {};
			try {
				if (typeof response.error === 'string') {
					errParse = JSON.parse(response.error);
				} else {
					errParse = response.error;
				}
				code = errParse && errParse.faultInfo && errParse.faultInfo.code;
			} catch (e) {
				console.error(e);
			}
		}
		error = errorMessages.get(code) || errorMessages.get('DEFAULT');
		return new ExceptionInfo('CareEventsLibraryService', [new Exception({...error, code: error.code || code})]);
	}
}
