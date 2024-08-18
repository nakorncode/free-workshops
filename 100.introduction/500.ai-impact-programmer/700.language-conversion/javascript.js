const UserRole = {
  ADMIN: 0,
  AUTHOR: 1,
  READER: 2
};

const ContentStatus = {
  DRAFT: 0,
  PUBLISHED: 1,
  ARCHIVED: 2
};

class User {
  constructor(id, username, email, role) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
  }

  getId() {
    return this.id;
  }

  getUsername() {
    return this.username;
  }

  getRole() {
    return this.role;
  }

  setRole(role) {
    this.role = role;
  }
}

class BlogComment {
  constructor(id, content, author) {
    this.id = id;
    this.content = content;
    this.author = author;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.status = ContentStatus.PUBLISHED;
  }

  getId() {
    return this.id;
  }

  getContent() {
    return this.content;
  }

  getAuthor() {
    return this.author;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status) {
    this.status = status;
    this.updatedAt = new Date();
  }

  updateContent(content) {
    this.content = content;
    this.updatedAt = new Date();
  }
}

class Article {
  constructor(id, title, content, author, tags = []) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.comments = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.status = ContentStatus.DRAFT;
    this.tags = tags;
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getContent() {
    return this.content;
  }

  getAuthor() {
    return this.author;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status) {
    this.status = status;
    this.updatedAt = new Date();
  }

  getTags() {
    return this.tags;
  }

  addComment(comment) {
    this.comments.push(comment);
  }

  removeComment(commentId) {
    this.comments = this.comments.filter(comment => comment.getId() !== commentId);
  }

  getComments() {
    return this.comments.filter(comment => comment.getStatus() === ContentStatus.PUBLISHED);
  }

  updateContent(title, content) {
    this.title = title;
    this.content = content;
    this.updatedAt = new Date();
  }
}

class Blog {
  constructor() {
    this.articles = [];
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  addArticle(article) {
    this.articles.push(article);
  }

  removeArticle(articleId) {
    this.articles = this.articles.filter(article => article.getId() !== articleId);
  }

  getArticles(status) {
    if (status !== undefined) {
      return this.articles.filter(article => article.getStatus() === status);
    }
    return this.articles;
  }

  getArticleById(id) {
    return this.articles.find(article => article.getId() === id);
  }

  getUserById(id) {
    return this.users.find(user => user.getId() === id);
  }

  listArticles(page = 1, pageSize = 10) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.articles
      .filter(article => article.getStatus() === ContentStatus.PUBLISHED)
      .sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime())
      .slice(startIndex, endIndex);
  }

  searchArticles(query) {
    const lowercaseQuery = query.toLowerCase();
    return this.articles.filter(article =>
      article.getStatus() === ContentStatus.PUBLISHED &&
      (article.getTitle().toLowerCase().includes(lowercaseQuery) ||
       article.getContent().toLowerCase().includes(lowercaseQuery) ||
       article.getTags().some(tag => tag.toLowerCase().includes(lowercaseQuery)))
    );
  }
}

class PermissionManager {
  static canCreateArticle(user) {
    return user.getRole() === UserRole.ADMIN || user.getRole() === UserRole.AUTHOR;
  }

  static canEditArticle(user, article) {
    return user.getRole() === UserRole.ADMIN || user.getId() === article.getAuthor().getId();
  }

  static canDeleteArticle(user, article) {
    return user.getRole() === UserRole.ADMIN || user.getId() === article.getAuthor().getId();
  }

  static canCreateComment(user) {
    return true; // All users can create comments
  }

  static canEditComment(user, comment) {
    return user.getRole() === UserRole.ADMIN || user.getId() === comment.getAuthor().getId();
  }

  static canDeleteComment(user, comment) {
    return user.getRole() === UserRole.ADMIN || user.getId() === comment.getAuthor().getId();
  }
}

// Usage example
const blog = new Blog();

const admin = new User(1, "admin", "admin@example.com", UserRole.ADMIN);
const author = new User(2, "john_doe", "john@example.com", UserRole.AUTHOR);
const reader = new User(3, "jane_smith", "jane@example.com", UserRole.READER);

blog.addUser(admin);
blog.addUser(author);
blog.addUser(reader);

const article1 = new Article(1, "Introduction to JavaScript", "JavaScript is a versatile programming language...", author, ["javascript", "programming"]);
const article2 = new Article(2, "Advanced JavaScript Features", "In this article, we'll explore advanced JavaScript features...", author, ["javascript", "advanced"]);

if (PermissionManager.canCreateArticle(author)) {
  blog.addArticle(article1);
  blog.addArticle(article2);
  article1.setStatus(ContentStatus.PUBLISHED);
  article2.setStatus(ContentStatus.PUBLISHED);
}

const comment1 = new BlogComment(1, "Great article!", reader);
const comment2 = new BlogComment(2, "Thanks for the information.", reader);

if (PermissionManager.canCreateComment(reader)) {
  article1.addComment(comment1);
  article1.addComment(comment2);
}

console.log("All articles:");
console.log(blog.listArticles());

console.log("\nSearch results for 'advanced':");
console.log(blog.searchArticles("advanced"));

if (PermissionManager.canEditArticle(author, article1)) {
  article1.updateContent("Introduction to JavaScript 2023", "JavaScript is a powerful and versatile programming language...");
}

if (PermissionManager.canDeleteComment(admin, comment2)) {
  article1.removeComment(comment2.getId());
}

console.log("\nUpdated article 1:");
console.log(blog.getArticleById(1));

console.log("\nComments for article 1:");
console.log(blog.getArticleById(1).getComments());
