import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private baseURL: string = 'https://api.github.com/users'

	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		//'Authorization': 'Bearer ' + '<YOUR-TOKEN>'
	})

	constructor(private http: HttpClient) { }

	getUserByLogin(login: string): Observable<User> {
		const URL = `${this.baseURL}/${login}`

		return this.http.get<any>(URL, { headers: this.headers }).pipe(
			map(item => User.adapt(item)),
			catchError(err => { throw err })
		)
	}
}
