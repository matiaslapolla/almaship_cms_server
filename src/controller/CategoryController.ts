import { NextFunction, Request, Response } from "express";
import CategoryService from "../service/CategoryService";

export const categoryController = () => {
	const service = new CategoryService();

	async function getCategories(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const categories = await service.getCategories();
			res.json(categories);
		} catch (error) {
			console.error(error);
		}
	}

	async function getCategoryById(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const category = await service.getCategoryById(req.body.id);
			res.json(category);
		} catch (error) {
			console.error(error);
		}
	}

	async function createCategory(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const category = await service.createCategory(req.body.data);
			res.json(category);
		} catch (error) {
			console.error(error);
		}
	}

	async function updateCategory(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const category = await service.updateCategory(req.body.data);
			res.json(category);
		} catch (error) {
			console.error(error);
		}
	}

	async function deleteCategory(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const category = await service.deleteCategory(req.body.data.id);
			res.json(category);
		} catch (error) {
			console.error(error);
		}
	}

	return {
		getCategories,
		getCategoryById,
		createCategory,
		updateCategory,
		deleteCategory,
	};
};
