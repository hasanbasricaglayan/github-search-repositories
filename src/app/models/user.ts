export class User {
	constructor(
		public id: number,
		public login: string,
		public avatar_url: string,
		public public_repos: number
	) { }

	static adapt(item: any): User {
		return new User(
			item.id,
			item.login,
			item.avatar_url,
			item.public_repos
		)
	}
}
