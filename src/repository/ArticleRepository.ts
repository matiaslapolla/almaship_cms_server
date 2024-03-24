import db from "../util/PgConnect";

class ArticleRepository {
	private dbc: any;

	constructor() {
		this.dbc = db;
		db.connect();
	}

	async getArticles() {
		let articles = await this.dbc.query("SELECT * FROM articles");
		let authors: any = [];

		for (let i = 0; i < articles.length; i++) {
			let newAuthor = await this.gehtAuthorFromArticle(articles[i].author_id);
			if (newAuthor.length > 0) {
				if (!authors.find((author: any) => author.id === newAuthor[0].id)) {
					authors.push(newAuthor[0]);
				}
			}
		}

		for (let i = 0; i < articles.length; i++) {
			for (let j = 0; j < authors.length; j++) {
				if (articles[i].author_id === authors[j].id) {
					articles[i].author = authors[j];
				}
			}
		}

		console.log("articles ", articles);

		return articles;
	}

	private async gehtAuthorFromArticle(id: number) {
		return await this.dbc.query(
			"SELECT * FROM authors WHERE id = $1 LIMIT 1",
			id
		);
	}

	async getArticleById(id: number) {
		return await this.dbc.query("SELECT * FROM articles WHERE id = $1", [id]);
	}

	async createArticle(article: any) {
		return await this.dbc.query(
			"INSERT INTO articles (title, content, tags, category, author_id) VALUES ($1, $2, $3, $4, $5)",
			[
				article.title,
				article.content,
				article.tags,
				article.category,
				article.author_id,
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
