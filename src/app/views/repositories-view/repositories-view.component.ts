import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, shareReplay } from 'rxjs';
import { Repository } from 'src/app/models/repository';
import { User } from 'src/app/models/user';
import { RepositoryService } from 'src/app/services/repository/repository.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
	selector: 'app-repositories-view',
	templateUrl: './repositories-view.component.html',
	styleUrls: ['./repositories-view.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoriesViewComponent {
	repositories$: Observable<Repository[]> | undefined
	currentRepository: Repository | undefined
	user$: Observable<User> | undefined

	sortOptions = [
		{ value: 'stars', text: 'Stars' },
		{ value: 'forks', text: 'Forks' },
		{ value: 'help-wanted-issues', text: 'Help wanted issues' },
		{ value: 'updated', text: 'Last updated' }
	]

	orderOptions = [
		{ value: 'asc', text: 'Ascending' },
		{ value: 'desc', text: 'Descending' }
	]

	perPageOptions = [
		{ value: 20, text: '20' },
		{ value: 50, text: '50' },
		{ value: 100, text: '100' }
	]

	constructor(private repositoryService: RepositoryService, private userService: UserService) { }

	searchRepositories(form: NgForm) {
		let params = {
			topic: form.value.topic,
			language: form.value.language,
			stars: form.value.stars,
			sort: form.value.sort,
			order: form.value.order,
			perPage: form.value.perPage
		}

		this.repositories$ = this.repositoryService.getRepositoriesByTopicLanguageAndStars(
			params.topic,
			params.language,
			params.stars,
			params.sort,
			params.order,
			params.perPage
		)
	}

	showRepositoryDetails(repository: Repository): void {
		this.currentRepository = repository
		this.user$ = this.userService.getUserByLogin(repository.owner_login).pipe(shareReplay())
	}

	hideRepositoryDetails(): void {
		this.currentRepository = undefined
	}
}
