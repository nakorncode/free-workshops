import { User, UserRole, BlogComment, Article, Blog, ContentStatus, PermissionManager } from './code';

describe('User', () => {
  it('should create a user with the correct properties', () => {
    const user = new User(1, 'testuser', 'test@example.com', UserRole.AUTHOR);
    expect(user.getId()).toBe(1);
    expect(user.getUsername()).toBe('testuser');
    expect(user.getRole()).toBe(UserRole.AUTHOR);
  });

  it('should update the user role', () => {
    const user = new User(1, 'testuser', 'test@example.com', UserRole.AUTHOR);
    user.setRole(UserRole.ADMIN);
    expect(user.getRole()).toBe(UserRole.ADMIN);
  });
});

describe('BlogComment', () => {
  const user = new User(1, 'testuser', 'test@example.com', UserRole.READER);

  it('should create a comment with the correct properties', () => {
    const comment = new BlogComment(1, 'This is a comment', user);
    expect(comment.getId()).toBe(1);
    expect(comment.getContent()).toBe('This is a comment');
    expect(comment.getAuthor()).toBe(user);
    expect(comment.getStatus()).toBe(ContentStatus.PUBLISHED);
  });

  it('should update the comment status', () => {
    const comment = new BlogComment(1, 'This is a comment', user);
    comment.setStatus(ContentStatus.ARCHIVED);
    expect(comment.getStatus()).toBe(ContentStatus.ARCHIVED);
  });

  it('should update the comment content', () => {
    const comment = new BlogComment(1, 'This is a comment', user);
    comment.updateContent('Updated comment');
    expect(comment.getContent()).toBe('Updated comment');
  });
});

describe('Article', () => {
  const author = new User(1, 'author', 'author@example.com', UserRole.AUTHOR);

  it('should create an article with the correct properties', () => {
    const article = new Article(1, 'Test Title', 'Test Content', author, ['tag1', 'tag2']);
    expect(article.getId()).toBe(1);
    expect(article.getTitle()).toBe('Test Title');
    expect(article.getContent()).toBe('Test Content');
    expect(article.getAuthor()).toBe(author);
    expect(article.getTags()).toEqual(['tag1', 'tag2']);
  });

  it('should update the article status', () => {
    const article = new Article(1, 'Test Title', 'Test Content', author, ['tag1', 'tag2']);
    article.setStatus(ContentStatus.PUBLISHED);
    expect(article.getStatus()).toBe(ContentStatus.PUBLISHED);
  });

  it('should add and remove comments from an article', () => {
    const article = new Article(1, 'Test Title', 'Test Content', author);
    const comment = new BlogComment(1, 'Nice article', author);
    article.addComment(comment);
    expect(article.getComments()).toHaveLength(1);
    article.removeComment(comment.getId());
    expect(article.getComments()).toHaveLength(0);
  });

  it('should update the article content', () => {
    const article = new Article(1, 'Test Title', 'Test Content', author);
    article.updateContent('New Title', 'New Content');
    expect(article.getTitle()).toBe('New Title');
    expect(article.getContent()).toBe('New Content');
  });
});

describe('Blog', () => {
  const author = new User(1, 'author', 'author@example.com', UserRole.AUTHOR);
  const reader = new User(2, 'reader', 'reader@example.com', UserRole.READER);
  const blog = new Blog();

  it('should add and retrieve users', () => {
    blog.addUser(author);
    blog.addUser(reader);
    expect(blog.getUserById(1)).toBe(author);
    expect(blog.getUserById(2)).toBe(reader);
  });

  it('should add and retrieve articles', () => {
    const article = new Article(1, 'Test Title', 'Test Content', author);
    blog.addArticle(article);
    expect(blog.getArticleById(1)).toBe(article);
  });

  it('should remove articles', () => {
    const article = new Article(1, 'Test Title', 'Test Content', author);
    blog.addArticle(article);
    blog.removeArticle(1);
    expect(blog.getArticleById(1)).toBeUndefined();
  });

  it('should list articles with pagination', () => {
    const article1 = new Article(1, 'Title 1', 'Content 1', author);
    const article2 = new Article(2, 'Title 2', 'Content 2', author);
    article1.setStatus(ContentStatus.PUBLISHED);
    article2.setStatus(ContentStatus.PUBLISHED);
    blog.addArticle(article1);
    blog.addArticle(article2);

    const paginatedArticles = blog.listArticles(1, 1);
    expect(paginatedArticles).toHaveLength(1);
    expect(paginatedArticles[0]).toBe(article2);
  });

  it('should search for articles by title, content, or tags', () => {
    const article = new Article(1, 'JavaScript', 'JavaScript content', author, ['js']);
    article.setStatus(ContentStatus.PUBLISHED);
    blog.addArticle(article);

    const searchResults = blog.searchArticles('JavaScript');
    expect(searchResults).toHaveLength(1);
    expect(searchResults[0]).toBe(article);
  });
});

describe('PermissionManager', () => {
  const admin = new User(1, 'admin', 'admin@example.com', UserRole.ADMIN);
  const author = new User(2, 'author', 'author@example.com', UserRole.AUTHOR);
  const reader = new User(3, 'reader', 'reader@example.com', UserRole.READER);

  const article = new Article(1, 'Title', 'Content', author);

  it('should allow admin and author to create articles', () => {
    expect(PermissionManager.canCreateArticle(admin)).toBe(true);
    expect(PermissionManager.canCreateArticle(author)).toBe(true);
    expect(PermissionManager.canCreateArticle(reader)).toBe(false);
  });

  it('should allow admin and article author to edit articles', () => {
    expect(PermissionManager.canEditArticle(admin, article)).toBe(true);
    expect(PermissionManager.canEditArticle(author, article)).toBe(true);
    expect(PermissionManager.canEditArticle(reader, article)).toBe(false);
  });

  it('should allow admin and article author to delete articles', () => {
    expect(PermissionManager.canDeleteArticle(admin, article)).toBe(true);
    expect(PermissionManager.canDeleteArticle(author, article)).toBe(true);
    expect(PermissionManager.canDeleteArticle(reader, article)).toBe(false);
  });

  it('should allow any user to create comments', () => {
    expect(PermissionManager.canCreateComment(admin)).toBe(true);
    expect(PermissionManager.canCreateComment(author)).toBe(true);
    expect(PermissionManager.canCreateComment(reader)).toBe(true);
  });

  it('should allow admin and comment author to edit comments', () => {
    const comment = new BlogComment(1, 'Comment', reader);
    expect(PermissionManager.canEditComment(admin, comment)).toBe(true);
    expect(PermissionManager.canEditComment(reader, comment)).toBe(true);
    expect(PermissionManager.canEditComment(author, comment)).toBe(false);
  });

  it('should allow admin and comment author to delete comments', () => {
    const comment = new BlogComment(1, 'Comment', reader);
    expect(PermissionManager.canDeleteComment(admin, comment)).toBe(true);
    expect(PermissionManager.canDeleteComment(reader, comment)).toBe(true);
    expect(PermissionManager.canDeleteComment(author, comment)).toBe(false);
  });
});
