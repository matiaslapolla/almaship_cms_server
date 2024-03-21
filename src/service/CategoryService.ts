import { Request } from "express";
import CategoryRepository from "../repository/CategoryRepository";
import { Category } from "../types/types";

class CategoryService {
	private repo: CategoryRepository;

	constructor() {
		this.repo = new CategoryRepository();
	}

	public async getCategories() {
		return await this.repo.getCategories();
	}

	public async getCategoryById(req: Request) {
		let id = req.body.id;
		return await this.repo.getCategoryById(id);
	}

	public async createCategory(req: Request) {
		let category: Category = {
			name: req.body.name,
			id: req.body.id,
			value: req.body.value,
		};
		return await this.repo.createCategory(category);
	}

	public async updateCategory(req: Request) {
		let category: Category = {
			id: req.body.id,
			name: req.body.name,
			value: req.body.value,
		};
		return await this.repo.updateCategory(category);
	}

	public async deleteCategory(req: Request) {
		let id = req.body.id;
		return await this.repo.deleteCategory(id);
	}
}

export default CategoryService;
