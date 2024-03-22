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

		if (!emailresponse) {
			return "Invalid Credentials";
		}

		let passwordMatch = await verify(emailresponse[0].password, req.password);

		if (!passwordMatch) {
			return "Invalid Credentials";
		}

		const payload = { email: req.email };

		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		return {
			token: token,
			email: req.email,
			status: "success",
		};
	}

	public async register(req: any) {
		const pwhash = hash(req.password);

		let user = {
			username: req.username,
			email: req.email,
			password: pwhash,
		};
		return await this.repo.register(user);
	}
}

export default UserService;
