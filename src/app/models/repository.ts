export class Repository {
	constructor(
		public id: number,
		public name: string,
		public description: string,
		public html_url: string,
		public stargazers_count: number,
		public forks_count: number,
		public open_issues_count: number,
		public updated_at: Date,
		public owner_login: string
	) { }

	static adapt(item: any): Repository {
		return new Repository(
			item.id,
			item.name,
			item.description,
			item.html_url,
			item.stargazers_count,
			item.forks_count,
			item.open_issues_count,
			item.updated_at,
			item.owner.login
		)
	}
}
