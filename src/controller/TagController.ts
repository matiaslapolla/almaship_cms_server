import { NextFunction, Request, Response } from "express";
import TagService from "../service/TagService";

export const tagController = () => {
	const service = new TagService();

	async function getTags(req: Request, res: Response, next: NextFunction) {
		try {
			const tags = await service.getTags();
			res.json(tags);
		} catch (error) {
			console.error(error);
		}
	}

	async function getTagById(req: Request, res: Response, next: NextFunction) {
		try {
			const tag = await service.getTagById(req.body.data.id);
			res.json(tag);
		} catch (error) {
			console.error(error);
		}
	}

	async function createTag(req: Request, res: Response, next: NextFunction) {
		try {
			const tag = await service.createTag(req.body.data);
			res.json(tag);
		} catch (error) {
			console.error(error);
		}
	}

	async function updateTag(req: Request, res: Response, next: NextFunction) {
		try {
			const tag = await service.updateTag(req.body.data);
			res.json(tag);
		} catch (error) {
			console.error(error);
		}
	}

	async function deleteTag(req: Request, res: Response, next: NextFunction) {
		try {
			const tag = await service.deleteTag(req.body.data.id);
			res.json(tag);
		} catch (error) {
			console.error(error);
		}
	}

	return {
		getTags,
		getTagById,
		createTag,
		updateTag,
		deleteTag,
	};
};
