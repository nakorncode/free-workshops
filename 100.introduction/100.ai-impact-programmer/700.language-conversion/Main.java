import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

// Enums
public enum UserRole {
    ADMIN(0),
    AUTHOR(1),
    READER(2);

    private final int value;

    UserRole(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}

public enum ContentStatus {
    DRAFT(0),
    PUBLISHED(1),
    ARCHIVED(2);

    private final int value;

    ContentStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}

// User class
public class User {
    private final int id;
    private final String username;
    private final String email;
    private UserRole role;

    public User(int id, String username, String email, UserRole role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
    }

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }
}

// BlogComment class
public class BlogComment {
    private final int id;
    private String content;
    private final User author;
    private Date createdAt;
    private Date updatedAt;
    private ContentStatus status;

    public BlogComment(int id, String content, User author) {
        this.id = id;
        this.content = content;
        this.author = author;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.status = ContentStatus.PUBLISHED;
    }

    public int getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public User getAuthor() {
        return author;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public ContentStatus getStatus() {
        return status;
    }

    public void setStatus(ContentStatus status) {
        this.status = status;
        this.updatedAt = new Date();
    }

    public void updateContent(String content) {
        this.content = content;
        this.updatedAt = new Date();
    }
}

// Article class
public class Article {
    private final int id;
    private String title;
    private String content;
    private final User author;
    private List<BlogComment> comments;
    private Date createdAt;
    private Date updatedAt;
    private ContentStatus status;
    private List<String> tags;

    public Article(int id, String title, String content, User author, List<String> tags) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.comments = new ArrayList<>();
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.status = ContentStatus.DRAFT;
        this.tags = tags != null ? tags : new ArrayList<>();
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public User getAuthor() {
        return author;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public ContentStatus getStatus() {
        return status;
    }

    public void setStatus(ContentStatus status) {
        this.status = status;
        this.updatedAt = new Date();
    }

    public List<String> getTags() {
        return tags;
    }

    public void addComment(BlogComment comment) {
        this.comments.add(comment);
    }

    public void removeComment(int commentId) {
        this.comments = this.comments.stream()
                .filter(comment -> comment.getId() != commentId)
                .collect(Collectors.toList());
    }

    public List<BlogComment> getComments() {
        return this.comments.stream()
                .filter(comment -> comment.getStatus() == ContentStatus.PUBLISHED)
                .collect(Collectors.toList());
    }

    public void updateContent(String title, String content) {
        this.title = title;
        this.content = content;
        this.updatedAt = new Date();
    }
}

// Blog class
public class Blog {
    private List<Article> articles;
    private List<User> users;

    public Blog() {
        this.articles = new ArrayList<>();
        this.users = new ArrayList<>();
    }

    public void addUser(User user) {
        this.users.add(user);
    }

    public void addArticle(Article article) {
        this.articles.add(article);
    }

    public void removeArticle(int articleId) {
        this.articles = this.articles.stream()
                .filter(article -> article.getId() != articleId)
                .collect(Collectors.toList());
    }

    public List<Article> getArticles(ContentStatus status) {
        if (status != null) {
            return this.articles.stream()
                    .filter(article -> article.getStatus() == status)
                    .collect(Collectors.toList());
        }
        return this.articles;
    }

    public Article getArticleById(int id) {
        return this.articles.stream()
                .filter(article -> article.getId() == id)
                .findFirst()
                .orElse(null);
    }

    public User getUserById(int id) {
        return this.users.stream()
                .filter(user -> user.getId() == id)
                .findFirst()
                .orElse(null);
    }

    public List<Article> listArticles(int page, int pageSize) {
        return this.articles.stream()
                .filter(article -> article.getStatus() == ContentStatus.PUBLISHED)
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .collect(Collectors.toList());
    }

    public List<Article> searchArticles(String query) {
        String lowercaseQuery = query.toLowerCase();
        return this.articles.stream()
                .filter(article -> article.getStatus() == ContentStatus.PUBLISHED &&
                        (article.getTitle().toLowerCase().contains(lowercaseQuery) ||
                                article.getContent().toLowerCase().contains(lowercaseQuery) ||
                                article.getTags().stream().anyMatch(tag -> tag.toLowerCase().contains(lowercaseQuery))))
                .collect(Collectors.toList());
    }
}

// PermissionManager class
public class PermissionManager {

    public boolean canCreateArticle(User user) {
        return user.getRole() == UserRole.ADMIN || user.getRole() == UserRole.AUTHOR;
    }

    public boolean canEditArticle(User user, Article article) {
        return user.getRole() == UserRole.ADMIN || user.getId() == article.getAuthor().getId();
    }

    public boolean canDeleteArticle(User user, Article article) {
        return user.getRole() == UserRole.ADMIN || user.getId() == article.getAuthor().getId();
    }

    public boolean canCreateComment(User user) {
        return true; // All users can create comments
    }

    public boolean canEditComment(User user, BlogComment comment) {
        return user.getRole() == UserRole.ADMIN || user.getId() == comment.getAuthor().getId();
    }

    public boolean canDeleteComment(User user, BlogComment comment) {
        return user.getRole() == UserRole.ADMIN || user.getId() == comment.getAuthor().getId();
    }
}

// Usage example
public class Main {
    public static void main(String[] args) {
        Blog blog = new Blog();

        User admin = new User(1, "admin", "admin@example.com", UserRole.ADMIN);
        User author = new User(2, "john_doe", "john@example.com", UserRole.AUTHOR);
        User reader = new User(3, "jane_smith", "jane@example.com", UserRole.READER);

        blog.addUser(admin);
        blog.addUser(author);
        blog.addUser(reader);

        Article article1 = new Article(1, "Introduction to JavaScript", "JavaScript is a versatile programming language...", author, List.of("javascript", "programming"));
        Article article2 = new Article(2, "Advanced JavaScript Features", "In this article, we'll explore advanced JavaScript features...", author, List.of("javascript", "advanced"));

        PermissionManager pm = new PermissionManager();

        if (pm.canCreateArticle(author)) {
            blog.addArticle(article1);
            blog.addArticle(article2);
            article1.setStatus(ContentStatus.PUBLISHED);
            article2.setStatus(ContentStatus.PUBLISHED);
        }

        BlogComment comment1 = new BlogComment(1, "Great article!", reader);
        BlogComment comment2 = new BlogComment(2, "Thanks for the information.", reader);

        if (pm.canCreateComment(reader)) {
            article1.addComment(comment1);
            article1.addComment(comment2);
        }

        System.out.println("All articles:");
        for (Article article : blog.listArticles(1, 10)) {
            System.out.println(article);
        }

        System.out.println("\nSearch results for 'advanced':");
        for (Article article : blog.searchArticles("advanced")) {
            System.out.println(article);
        }

        if (pm.canEditArticle(author, article1)) {
            article1.updateContent("Introduction to JavaScript 2023", "JavaScript is a powerful and versatile programming language...");
        }

        if (pm.canDeleteComment(admin, comment2)) {
            article1.removeComment(comment2.getId());
        }

        System.out.println("\nUpdated article 1:");
        Article updatedArticle = blog.getArticleById(1);
        if (updatedArticle != null) {
            System.out.println(updatedArticle);
        }

        System.out.println("\nComments for article 1:");
        if (updatedArticle != null) {
            for (BlogComment comment : updatedArticle.getComments()) {
                System.out.println(comment);
            }
        }
    }
}
