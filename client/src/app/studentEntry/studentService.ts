import { Injectable } from '@angular/core';
import { HttpService } from '../shared/services';
import { HelperService } from '../shared/services';


@Injectable({
		providedIn: 'root'
	  })
export class StudentService {
_changePolicy:Boolean;
	constructor(
		private http: HttpService,
		private helper:HelperService
	) {}

	saveStudent(body: any) {
		return this.http.post('student', body);
	}
	
}