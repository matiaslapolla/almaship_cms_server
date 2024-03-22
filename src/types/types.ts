export interface Author {
	id: string;
	name: string;
	avatar?: string;
	bio?: string;
	created_at?: Date;
	updated_at?: Date;
}

export interface Article {
	id: string;
	title: string;
	content: string;
	tags: string[];
	category: string;
	author: Author;
	created_at?: Date;
	updated_at?: Date;
}

export interface Tag {
	value: string;
	name: string;
	id: string;
	created_at?: Date;
	updated_at?: Date;
}

export interface Category {
	value: string;
	name: string;
	id: string;
	created_at?: Date;
	updated_at?: Date;
}

export interface ArticleImage {
	url: string;
}

export interface User {
	id: string;
	email: string;
	username: string;
	password: string;
}
