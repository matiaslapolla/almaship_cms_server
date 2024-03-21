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

	async createCategory(category: any) {
		return await this.dbc.query(
			"INSERT INTO categories (name, value, created_at, updated_at) VALUES ($1, $2, $3, $4)",
			[category.name, category.value, category.created_at, category.updated_at]
		);
	}

	async updateCategory(category: any) {
		return await this.dbc.query(
			"UPDATE categories SET name = $1, value = $2 WHERE id = $3",
			[category.name, category.value, category.id]
		);
	}

	async deleteCategory(id: number) {
		return await this.dbc.query("DELETE FROM categories WHERE id = $1", [id]);
	}
}

export default CategoryRepository;
