import db from "../util/PgConnect";

class TagRepository {
	private dbc: any;

	constructor() {
		this.dbc = db;
		db.connect();
	}

	async getTags() {
		return await this.dbc.query("SELECT * FROM tags");
	}

	async getTagById(id: number) {
		return await this.dbc.query("SELECT * FROM tags WHERE id = $1", [id]);
	}

	async createTag(tag: any) {
		return await this.dbc.query(
			"INSERT INTO tags (name, value) VALUES ($1, $2) RETURNING id",
			[tag.name, tag.value]
		);
	}

	async updateTag(tag: any) {
		return await this.dbc.query("UPDATE tags SET name = $1 WHERE id = $2", [
			tag.name,
			tag.id,
		]);
	}

	async deleteTag(id: number) {
		return await this.dbc.query("DELETE FROM tags WHERE id = $1", [id]);
	}
}

export default TagRepository;
