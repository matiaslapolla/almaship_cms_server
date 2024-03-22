import { Router } from "express";
import express from "express";
import { articleController } from "../controller/ArticleController";
import { tagController } from "../controller/TagController";
import { categoryController } from "../controller/CategoryController";
import { authorController } from "../controller/AuthorController";
import { userController } from "../controller/UserController";

export const router: Router = (() => {
	const router = express.Router();

	const article_controller = articleController();
	const tag_controller = tagController();
	const category_controller = categoryController();
	const author_controller = authorController();
	const user_controller = userController();

	router.get("/", (req, res) => {
		res.send("Hello World");
	});

	router.get("/articles", article_controller.getArticles);
	router.get("/article", article_controller.getArticleById);
	router.post("/update-article", article_controller.updateArticle);
	router.post("/create-article", article_controller.createArticle);
	router.post("/delete-article", article_controller.deleteArticle);
	router.post("/article-image", article_controller.uploadArticleImage);
	router.post("/articles/category", article_controller.getArticlesByCategory);

	router.get("/tags", tag_controller.getTags);
	router.get("/tag", tag_controller.getTagById);
	router.post("/create-tag", tag_controller.createTag);
	router.post("/update-tag", tag_controller.updateTag);
	router.post("/delete-tag", tag_controller.deleteTag);

	router.get("/categories", category_controller.getCategories);
	router.get("/category", category_controller.getCategoryById);
	router.post("/create-category", category_controller.createCategory);
	router.post("/update-category", category_controller.updateCategory);
	router.post("/delete-category", category_controller.deleteCategory);

	router.get("/authors", author_controller.getAuthors);
	router.get("/author", author_controller.getAuthorById);
	router.post("/create-author", author_controller.createAuthor);
	router.post("/update-author", author_controller.updateAuthor);
	router.post("/delete-author", author_controller.deleteAuthor);
	router.get("/author-articles", author_controller.getAuthorArticles);
	router.get(
		"/author-articles-category",
		author_controller.getAuthorArticlesByCategory
	);
	router.get("/author-articles-tag", author_controller.getAuthorArticlesByTag);

	router.get("/users", user_controller.getUsers);
	router.get("/user", user_controller.getUserById);
	router.post("/create-user", user_controller.createUser);
	router.post("/update-user", user_controller.updateUser);
	router.post("/delete-user", user_controller.deleteUser);
	router.post("/login", user_controller.login);
	router.post("/register", user_controller.register);

	return router;
})();
