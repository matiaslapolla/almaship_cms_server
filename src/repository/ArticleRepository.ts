// article repo

import db from "../util/PgConnect";

class ArticleRepository {
	private dbc: any;

	constructor() {
		this.dbc = db;
		db.connect();
	}

	async getArticles() {
		console.log("getArticles in repo");
		return await this.dbc.query("SELECT * FROM articles");
	}

	async getArticleById(id: number) {
		return await this.dbc.query("SELECT * FROM articles WHERE id = $1", [id]);
	}

	async createArticle(article: any) {
		return await this.dbc.query(
			"INSERT INTO articles (title, content, tags, category, author, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)",
			[
				article.title,
				article.content,
				article.tags,
				article.category,
				article.author,
				article.created_at,
				article.updated_at,
			]
		);
	}

	async updateArticle(article: any) {
		return await this.dbc.query(
			"UPDATE articles SET title = $1, content = $2, tags = $3, category = $4 WHERE id = $5",
			[
				article.title,
				article.content,
				article.tags,
				article.category,
				article.id,
			]
		);
	}

	async deleteArticle(id: number) {
		return await this.dbc.query("DELETE FROM articles WHERE id = $1", [id]);
	}

	async uploadArticleImage(image: any) {
		return await this.dbc.query(
			"INSERT INTO article_images (url) VALUES ($1)",
			[image.url]
		);
	}

	async getArticleByCategory(category: string) {
		return await this.dbc.query("SELECT * FROM articles WHERE category = $1", [
			category,
		]);
	}

	async getArticleByTag(tags: string[]) {
		return await this.dbc.query("SELECT * FROM articles WHERE tags = $1", [
			tags,
		]);
	}
}

export { ArticleRepository };
