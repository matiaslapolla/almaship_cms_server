import { NextFunction, Request, Response } from "express";
import AuthorService from "../service/AuthorService";

export const authorController = () => {
	const service = new AuthorService();

	async function getAuthors(req: Request, res: Response, next: NextFunction) {
		try {
			const authors = await service.getAuthors();
			res.json(authors);
		} catch (error: any) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}

	async function getAuthorById(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const author = await service.getAuthorById(req.query.id);
			res.json(author);
		} catch (error: any) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}

	async function createAuthor(req: Request, res: Response, next: NextFunction) {
		try {
			const author = await service.createAuthor(req.body.data);
			res.json(author);
		} catch (error: any) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}

	async function updateAuthor(req: Request, res: Response, next: NextFunction) {
		try {
			const author = await service.updateAuthor(req.body.data);
			res.json(author);
		} catch (error: any) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}

	async function deleteAuthor(req: Request, res: Response, next: NextFunction) {
		try {
			const author = await service.deleteAuthor(req.body.data.id);
			res.json(author);
		} catch (error: any) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}

	async function getAuthorArticles(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const author = await service.getAuthorArticles(req.body.data.id);
			res.json(author);
		} catch (error: any) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}

	async function getAuthorArticlesByCategory(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const author = await service.getAuthorArticlesByCategory(
				req.body.data.id,
				req.body.data.category_id
			);
			res.json(author);
		} catch (error: any) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}

	async function getAuthorArticlesByTag(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const author = await service.getAuthorArticlesByTag(
				req.body.data.id,
				req.body.data.tag_id
			);
			res.json(author);
		} catch (error: any) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}

	return {
		getAuthors,
		getAuthorById,
		createAuthor,
		updateAuthor,
		deleteAuthor,
		getAuthorArticles,
		getAuthorArticlesByCategory,
		getAuthorArticlesByTag,
	};
};
