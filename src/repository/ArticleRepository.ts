import db from "../util/PgConnect";

class ArticleRepository {
	private dbc: any;

	constructor() {
		this.dbc = db;
		db.connect();
	}

	async getArticles() {
		console.log("getting articles from repo");
		let articles: any;

		try {
			articles = await this.dbc.query(
				"SELECT * FROM articles WHERE archived = false"
			);
			console.log("got articles", articles);
		} catch (error) {
			console.error("error getting articles", error);
			return [];
		}

		let authors: any = [];

		for (let i = 0; i < articles.length; i++) {
			console.log("getting author", articles[i].author_id);
			let newAuthor: any;

			try {
				newAuthor = await this.gehtAuthorFromArticle(articles[i].author_id);
				console.log("got author", newAuthor);
			} catch (error) {
				console.error("error getting author", error);
				continue;
			}

			if (!newAuthor || newAuthor.length === 0) {
				console.log("did not get author");
				continue;
			}

			if (!authors.find((author: any) => author.id === newAuthor[0].id)) {
				console.log("adding author", newAuthor[0]);
				authors.push(newAuthor[0]);
			}
		}

		for (let i = 0; i < articles.length; i++) {
			if (!articles[i]) {
				console.log("article is undefined or null");
				continue;
			}

			for (let j = 0; j < authors.length; j++) {
				if (!authors[j]) {
					console.log("author is undefined or null");
					continue;
				}

				if (articles[i].author_id === authors[j].id) {
					console.log("setting author", authors[j]);
					articles[i].author = authors[j];
				}
			}
		}

		console.log("returning articles", articles);
		return articles;
	}

	private async gehtAuthorFromArticle(id: number) {
		return await this.dbc.query("SELECT * FROM authors WHERE id = $1", id);
	}

	async getArticleById(id: number) {
		console.log("id on repo", id);

		if (!this.dbc) {
			throw new Error("Database connection not initialized.");
		}

		try {
			return await this.dbc.query(
				"SELECT * FROM articles WHERE id = $1 LIMIT 1",
				[id]
			);
		} catch (error: any) {
			throw new Error(
				`Failed to get article by id: ${id}. Error: ${error.message}`
			);
		}
	}

	async createArticle(article: any) {
		return await this.dbc.query(
			"INSERT INTO articles (title, content, tags, category, author_id, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
			[
				article.title,
				article.content,
				article.tags,
				article.category,
				article.author,
				article.image,
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
		return await this.dbc.query(
			"UPDATE articles SET archived = true WHERE id = $1",
			[id]
		);
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
