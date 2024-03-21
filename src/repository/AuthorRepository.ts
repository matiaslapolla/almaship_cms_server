import db from "../util/PgConnect";

class AuthorRepository {
	private dbc: any;

	constructor() {
		this.dbc = db;
		db.connect();
	}

	async getAuthors() {
		return await this.dbc.query("SELECT * FROM authors");
	}

	async getAuthorById(id: number) {
		return await this.dbc.query("SELECT * FROM authors WHERE id = $1", [id]);
	}

	async createAuthor(author: any) {
		return await this.dbc.query(
			"INSERT INTO authors (name, created_at, updated_at) VALUES ($1, $2, $3)",
			[author.name, author.created_at, author.updated_at]
		);
	}

	async updateAuthor(author: any) {
		return await this.dbc.query("UPDATE authors SET name = $1 WHERE id = $2", [
			author.name,
			author.id,
		]);
	}

	async deleteAuthor(id: number) {
		return await this.dbc.query("DELETE FROM authors WHERE id = $1", [id]);
	}

	async getAuthorArticles(id: number) {
		return await this.dbc.query("SELECT * FROM articles WHERE author = $1", [
			id,
		]);
	}

	async getAuthorArticlesByCategory(id: number, category: string) {
		return await this.dbc.query(
			"SELECT * FROM articles WHERE author = $1 AND category = $2",
			[id, category]
		);
	}

	async getAuthorArticlesByTag(id: number, tag: string) {
		return await this.dbc.query(
			"SELECT * FROM articles WHERE author = $1 AND tags @> $2",
			[id, tag]
		);
	}
}

export default AuthorRepository;
