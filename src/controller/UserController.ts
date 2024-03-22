import { NextFunction, Request, Response } from "express";
import UserService from "../service/UserService";

export const userController = () => {
	const service = new UserService();

	async function getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await service.getUsers();
			res.json(users);
		} catch (error) {
			console.error(error);
		}
	}

	async function getUserById(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await service.getUserById(req.body.id);
			res.json(user);
		} catch (error) {
			console.error(error);
		}
	}

	async function createUser(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await service.createUser(req.body.data);
			res.json(user);
		} catch (error) {
			console.error(error);
		}
	}

	async function updateUser(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await service.updateUser(req.body.data);
			res.json(user);
		} catch (error) {
			console.error(error);
		}
	}

	async function deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await service.deleteUser(req.body.id);
			res.json(user);
		} catch (error) {
			console.error(error);
		}
	}

	async function login(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await service.login(req.body.data);
			res.json(user);
		} catch (error) {
			console.error(error);
		}
	}

	async function register(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await service.register(req.body.data);
			res.json(user);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	return {
		getUsers,
		getUserById,
		createUser,
		updateUser,
		deleteUser,
		login,
		register,
	};
};
