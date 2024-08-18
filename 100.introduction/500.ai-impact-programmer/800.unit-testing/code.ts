export enum UserRole {
  ADMIN = 0,
  AUTHOR = 1,
  READER = 2
}

export enum ContentStatus {
  DRAFT = 0,
  PUBLISHED = 1,
  ARCHIVED = 2
}

export class User {
  constructor(
    private id: number,
    private username: string,
    private email: string,
    private role: UserRole
  ) {}

  getId(): number {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getRole(): UserRole {
    return this.role;
  }

  setRole(role: UserRole): void {
    this.role = role;
  }
}

export class BlogComment {
  private createdAt: Date = new Date();
  private updatedAt: Date = new Date();
  private status: ContentStatus = ContentStatus.PUBLISHED;

  constructor(
    private id: number,
    private content: string,
    private author: User
  ) {}

  getId(): number {
    return this.id;
  }

  getContent(): string {
    return this.content;
  }

  getAuthor(): User {
    return this.author;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getStatus(): ContentStatus {
    return this.status;
  }

  setStatus(status: ContentStatus): void {
    this.status = status;
    this.updatedAt = new Date();
  }

  updateContent(content: string): void {
    this.content = content;
    this.updatedAt = new Date();
  }
}

export class Article {
  private comments: BlogComment[] = [];
  private createdAt: Date = new Date();
  private updatedAt: Date = new Date();
  private status: ContentStatus = ContentStatus.DRAFT;

  constructor(
    private id: number,
    private title: string,
    private content: string,
    private author: User,
    private tags: string[] = []
  ) {}

  getId(): number {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getContent(): string {
    return this.content;
  }

  getAuthor(): User {
    return this.author;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getStatus(): ContentStatus {
    return this.status;
  }

  setStatus(status: ContentStatus): void {
    this.status = status;
    this.updatedAt = new Date();
  }

  getTags(): string[] {
    return this.tags;
  }

  addComment(comment: BlogComment): void {
    this.comments.push(comment);
  }

  removeComment(commentId: number): void {
    this.comments = this.comments.filter(comment => comment.getId() !== commentId);
  }

  getComments(): BlogComment[] {
    return this.comments.filter(comment => comment.getStatus() === ContentStatus.PUBLISHED);
  }

  updateContent(title: string, content: string): void {
    this.title = title;
    this.content = content;
    this.updatedAt = new Date();
  }
}

export class Blog {
  private articles: Article[] = [];
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  addArticle(article: Article): void {
    this.articles.push(article);
  }

  removeArticle(articleId: number): void {
    this.articles = this.articles.filter(article => article.getId() !== articleId);
  }

  getArticles(status?: ContentStatus): Article[] {
    if (status !== undefined) {
      return this.articles.filter(article => article.getStatus() === status);
    }
    return this.articles;
  }

  getArticleById(id: number): Article | undefined {
    return this.articles.find(article => article.getId() === id);
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.getId() === id);
  }

  listArticles(page: number = 1, pageSize: number = 10): Article[] {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.articles
      .filter(article => article.getStatus() === ContentStatus.PUBLISHED)
      .sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime())
      .slice(startIndex, endIndex);
  }

  searchArticles(query: string): Article[] {
    const lowercaseQuery = query.toLowerCase();
    return this.articles.filter(article =>
      article.getStatus() === ContentStatus.PUBLISHED &&
      (article.getTitle().toLowerCase().includes(lowercaseQuery) ||
       article.getContent().toLowerCase().includes(lowercaseQuery) ||
       article.getTags().some(tag => tag.toLowerCase().includes(lowercaseQuery)))
    );
  }
}

export class PermissionManager {
  static canCreateArticle(user: User): boolean {
    return user.getRole() === UserRole.ADMIN || user.getRole() === UserRole.AUTHOR;
  }

  static canEditArticle(user: User, article: Article): boolean {
    return user.getRole() === UserRole.ADMIN || user.getId() === article.getAuthor().getId();
  }

  static canDeleteArticle(user: User, article: Article): boolean {
    return user.getRole() === UserRole.ADMIN || user.getId() === article.getAuthor().getId();
  }

  static canCreateComment(user: User): boolean {
    return true; // All users can create comments
  }

  static canEditComment(user: User, comment: BlogComment): boolean {
    return user.getRole() === UserRole.ADMIN || user.getId() === comment.getAuthor().getId();
  }

  static canDeleteComment(user: User, comment: BlogComment): boolean {
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
console.log(blog.getArticleById(1)?.getComments());
