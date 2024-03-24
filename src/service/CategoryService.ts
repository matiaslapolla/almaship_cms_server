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

	public async createCategory(data: Category) {
		let category: Category;
		if (!data) {
			throw new Error("createCategory called with null or undefined data");
		}
		category = {
			name: data.name,
			slug: data.slug,
		};
		try {
			return await this.repo.createCategory(category);
		} catch (error) {
			console.error(`createCategory error: ${error}`);
			throw error;
		}
	}

	public async updateCategory(req: Request) {
		let category: Category = {
			id: req.body.id,
			name: req.body.name,
			slug: req.body.slug,
		};
		return await this.repo.updateCategory(category);
	}

	public async deleteCategory(req: Request) {
		let id = req.body.id;
		return await this.repo.deleteCategory(id);
	}
}

export default CategoryService;
