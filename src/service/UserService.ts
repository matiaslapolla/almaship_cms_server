import UserRepository from "../repository/UserRepository";
import { User } from "../types/types";
import { hash, verify } from "argon2";
var jwt = require("jsonwebtoken");

class UserService {
	private repo: UserRepository;

	constructor() {
		this.repo = new UserRepository();
	}

	public async getUsers() {
		return await this.repo.getUsers();
	}

	public async getUserById(req: any) {
		let id = req.body?.id;
		return await this.repo.getUserById(id);
	}

	public async createUser(req: any) {
		let user: any = {
			username: req.body?.username,
			password: req.body?.password,
			email: req.body?.email,
			id: req.body?.id,
		};
		return await this.repo.createUser(user);
	}

	public async updateUser(req: any) {
		let user: User = {
			id: req.body?.id,
			username: req.body?.username,
			password: req.body?.password,
			email: req.body?.email,
		};
		return await this.repo.updateUser(user);
	}

	public async deleteUser(req: any) {
		let id = req.body?.data.id;
		return await this.repo.deleteUser(id);
	}

	public async login(req: any) {
		let user = {
			email: req.email,
		};

		let emailresponse = await this.repo.login(user);

		console.log(emailresponse);
		console.log(req.password);

		if (!emailresponse) {
			return "Invalid Credentials";
		}

		let passwordMatch = await verify(emailresponse[0].password, req.password);

		console.log("passwordMatch ", passwordMatch);

		if (!passwordMatch) {
			return "Invalid Credentials";
		}

		const token = jwt.sign({ id: emailresponse.id }, process.env.JWT_SECRET, {
			expiresIn: "10m",
		});

		console.log("token ", token);

		return {
			token: token,
			email: req.email,
			status: "success",
		};
	}

	public async register(req: any) {
		try {
			let pwhash = await hash(req.password, {
				timeCost: 4,
				memoryCost: 2 ** 14,
				parallelism: 2,
			});

			let user = {
				username: req.username,
				email: req.email,
				password: pwhash,
			};

			return await this.repo.register(user);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	public async logout() {
		return "logout";
	}

	public async verifyToken(token: string) {
		try {
			let decoded = jwt.verify(token, process.env.JWT_SECRET);
			let resp = {
				expire: new Date(decoded.exp * 1000).toISOString(),
				initialized: new Date(decoded.iat * 1000).toISOString(),
			};
			return resp;
		} catch (error) {
			console.log("error ", error);
			throw new Error("Invalid Token");
		}
	}
}

export default UserService;
