import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { IResponse } from 'src/app/models/iresponse';
import { Repository } from 'src/app/models/repository';

@Injectable({
	providedIn: 'root'
})
export class RepositoryService {
	private baseURL: string = 'https://api.github.com/search/repositories'

	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		//'Authorization': 'Bearer ' + '<YOUR-TOKEN>'
	})

	constructor(private http: HttpClient) { }

	getRepositoriesByTopicLanguageAndStars(
		topic: string,
		language: string,
		stars: number,
		sort: string,
		order: string,
		perPage: number
	): Observable<Repository[]> {
		let params = {
			q: `topic:${topic} language:${language} stars:${stars}`,
			sort: `${sort}`,
			order: `${order}`,
			per_page: `${perPage}`
		}

		return this.http.get<IResponse>(this.baseURL, { headers: this.headers, params }).pipe(
			map(response => response.items.map(item => Repository.adapt(item))),
			catchError(err => { throw err })
		)
	}
}
