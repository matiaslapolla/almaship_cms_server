import { Request } from "express";
import AuthorRepository from "../repository/AuthorRepository";
import { Author } from "../types/types";

class AuthorService {
	private repo: AuthorRepository;

	constructor() {
		this.repo = new AuthorRepository();
	}

	public async getAuthors() {
		return await this.repo.getAuthors();
	}

	public async getAuthorById(id: any) {
		return await this.repo.getAuthorById(id);
	}

	public async createAuthor(req: Request) {
		let author: Author = {
			id: req.body.id,
			name: req.body.name,
			created_at: new Date(),
			updated_at: new Date(),
		};

		return await this.repo.createAuthor(author);
	}

	public async updateAuthor(req: Request) {
		let author: Author = {
			id: req.body.id,
			name: req.body.name,
			created_at: req.body.created_at,
			updated_at: new Date(),
		};
		return await this.repo.updateAuthor(author);
	}

	public async deleteAuthor(req: Request) {
		let id = req.body.id;
		return await this.repo.deleteAuthor(id);
	}

	public async getAuthorArticles(req: Request) {
		let id = req.body.id;
		return await this.repo.getAuthorArticles(id);
	}

	public async getAuthorArticlesByCategory(aid: any, cid: any) {
		return await this.repo.getAuthorArticlesByCategory(aid, cid);
	}

	public async getAuthorArticlesByTag(aid: any, tid: any) {
		return await this.repo.getAuthorArticlesByTag(aid, tid);
	}
}

export default AuthorService;
