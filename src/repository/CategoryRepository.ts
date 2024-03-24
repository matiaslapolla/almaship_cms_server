import { Category } from "../types/types";
import db from "../util/PgConnect";

class CategoryRepository {
	private dbc: any;

	constructor() {
		this.dbc = db;
		db.connect();
	}

	async getCategories() {
		return await this.dbc.query("SELECT * FROM categories");
	}

	async getCategoryById(id: number) {
		return await this.dbc.query("SELECT * FROM categories WHERE id = $1", [id]);
	}

	async createCategory(category: Category) {
		return await this.dbc.query(
			"INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING *",
			[category.name, category.slug]
		);
	}

	async updateCategory(category: Category) {
		return await this.dbc.query(
			"UPDATE categories SET name = $1, value = $2 WHERE id = $3",
			[category.name, category.slug, category.id]
		);
	}

	async deleteCategory(id: number) {
		return await this.dbc.query("DELETE FROM categories WHERE id = $1", [id]);
	}
}

export default CategoryRepository;
