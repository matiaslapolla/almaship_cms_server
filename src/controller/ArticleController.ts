// article controller

import { NextFunction, Request, Response } from "express";
import ArticleService from "../service/ArticleService";
import { Article } from "../types/types";

export const articleController = () => {
	const service = new ArticleService();

	async function getArticles(req: Request, res: Response, next: NextFunction) {
		try {
			const articles = await service.getArticles();
			res.json(articles);
		} catch (error) {
			console.error(error);
		}
	}

	async function getArticleById(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const article = await service.getArticleById(req.body.data.id);
			res.json(article);
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * Create a new article
	 * @param {Request<{ data: Article }, any, any, any>} req
	 * @param {Response<Article, any>} res
	 * @param {NextFunction} next
	 * @returns {Promise<void>}
	 */
	async function createArticle(
		req: Request<{ data: Article }, any, any, any>,
		res: Response<any>,
		next: NextFunction
	): Promise<void> {
		if (!req.body?.data) {
			console.error("createArticle: req.body.data is null or undefined");
			res.status(400).json({ error: "req.body.data is null or undefined" });
			return;
		}

		try {
			const article = await service.createArticle(req.body.data);
			res.json(article);
		} catch (error) {
			console.error("createArticle: error creating article:", error);
			res.status(500).json({ error: "Error creating article" });
		}
	}

	async function updateArticle(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const article = await service.updateArticle(req.body.data);
			res.json(article);
		} catch (error) {
			console.error(error);
		}
	}

	async function deleteArticle(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const article = await service.deleteArticle(req.body.data.id);
			res.json(article);
		} catch (error) {
			console.error(error);
		}
	}

	async function uploadArticleImage(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const image = await service.uploadArticleImage(req.body.data.image);
			res.json(image);
		} catch (error) {
			console.error(error);
		}
	}

	async function getArticlesByCategory(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const article = await service.getArticlesByCategory(
				req.body.data.category
			);
			res.json(article);
		} catch (error) {
			console.error(error);
		}
	}

	async function getArticlesByTags(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const articles = await service.getArticlesByTags(req.body.data.tags);
			res.json(articles);
		} catch (error) {
			console.error(error);
		}
	}

	return {
		getArticles,
		getArticleById,
		createArticle,
		deleteArticle,
		uploadArticleImage,
		getArticlesByCategory,
		getArticlesByTags,
		updateArticle,
	};
};
