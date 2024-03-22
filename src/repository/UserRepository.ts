import { log } from "console";
import db from "../util/PgConnect";

class UserRepository {
	private dbc: any;

	constructor() {
		this.dbc = db;
		db.connect();
	}

	async getUsers() {
		return await this.dbc.query("SELECT * FROM users");
	}

	async getUserById(id: number) {
		return await this.dbc.query("SELECT * FROM users WHERE id = $1", [id]);
	}

	async createUser(user: any) {
		return await this.dbc.query(
			"INSERT INTO users (username, password, email, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)",
			[
				user.username,
				user.password,
				user.email,
				user.created_at,
				user.updated_at,
			]
		);
	}

	async updateUser(user: any) {
		return await this.dbc.query(
			"UPDATE users SET username = $1, password = $2, email = $3 WHERE id = $4",
			[user.username, user.password, user.email, user.id]
		);
	}

	async deleteUser(id: number) {
		return await this.dbc.query("DELETE FROM users WHERE id = $1", [id]);
	}

	async login(user: any) {
		try {
			return await this.dbc.query(
				"SELECT * FROM users WHERE email = $1 LIMIT 1",
				[user.email]
			);
		} catch (error) {
			log(error);
		}
	}

	async register(user: any) {
		try {
			let respreg = await this.dbc.query(
				"INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
				[user.username, user.email, user.password]
			);
			return respreg;
		} catch (error: any) {
			log("hubo un error", error);
			if (error.code === "23505") {
				throw new Error("Email already exists");
			}
		}
	}
}

export default UserRepository;
