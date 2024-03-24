import { Request } from "express";
import { Tag } from "../types/types";
import TagRepository from "../repository/TagRepository";

class TagService {
	private repo: TagRepository;

	constructor() {
		this.repo = new TagRepository();
	}

	public async getTags() {
		return await this.repo.getTags();
	}

	public async getTagById(req: Request) {
		let id = req.body.id;
		return await this.repo.getTagById(id);
	}

	public async createTag(data: Tag) {
		let tag: Tag = {
			name: data.name,
			value: data.value,
		};
		return await this.repo.createTag(tag);
	}

	public async updateTag(req: Request) {
		let tag: Tag = {
			id: req.body.id,
			name: req.body.name,
			value: req.body.value,
		};
		return await this.repo.updateTag(tag);
	}

	public async deleteTag(req: Request) {
		let id = req.body.id;
		return await this.repo.deleteTag(id);
	}
}

export default TagService;
