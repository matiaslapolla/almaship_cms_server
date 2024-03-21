// article service

import { Request } from "express";
import { Article, Tag } from "../types/types";
import { ArticleRepository } from "../repository/ArticleRepository";

class ArticleService {
	private repo: ArticleRepository;

	constructor() {
		this.repo = new ArticleRepository();
	}

	public async getArticles() {
		console.log("getArticles in service");
		return await this.repo.getArticles();
	}

	public async getArticleById(req: Request) {
		let id = req.body.id;
		return await this.repo.getArticleById(id);
	}

	public async createArticle(req: Request) {
		let id = crypto.randomUUID();
		let article: Article = {
			id: id,
			title: req.body.title,
			content: req.body.content,
			tags: req.body.tags,
			category: req.body.category,
			author: req.body.author,
			created_at: new Date(),
			updated_at: new Date(),
		};

		return await this.repo.createArticle(article);
	}

	public async updateArticle(req: Request) {
		let article: Article = {
			id: req.body.id,
			title: req.body.title,
			content: req.body.content,
			tags: req.body.tags,
			category: req.body.category,
			author: req.body.author,
			created_at: req.body.created_at,
			updated_at: new Date(),
		};
		return await this.repo.updateArticle(article);
	}

	public async deleteArticle(req: Request) {
		let id = req.body.id;
		return await this.repo.deleteArticle(id);
	}

	public async uploadArticleImage(file: any) {
		let image = file;
		return await this.repo.uploadArticleImage(image);
	}

	public async getArticlesByCategory(req: Request) {
		let category = req.body.category;
		return await this.repo.getArticleByCategory(category);
	}

	public async getArticlesByTags(req: Request) {
		let tags = req.body.tags;
		tags = tags.map((tag: Tag) => tag.value);
		return await this.repo.getArticleByTag(tags);
	}
}

export default ArticleService;
