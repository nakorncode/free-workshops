import java.util.Date

// Enums
enum class UserRole(val value: Int) {
    ADMIN(0),
    AUTHOR(1),
    READER(2)
}

enum class ContentStatus(val value: Int) {
    DRAFT(0),
    PUBLISHED(1),
    ARCHIVED(2)
}

// User class
data class User(
    val id: Int,
    val username: String,
    val email: String,
    var role: UserRole
)

// BlogComment class
data class BlogComment(
    val id: Int,
    var content: String,
    val author: User,
    var createdAt: Date = Date(),
    var updatedAt: Date = Date(),
    var status: ContentStatus = ContentStatus.PUBLISHED
) {
    fun updateContent(content: String) {
        this.content = content
        this.updatedAt = Date()
    }
}

// Article class
data class Article(
    val id: Int,
    var title: String,
    var content: String,
    val author: User,
    var comments: MutableList<BlogComment> = mutableListOf(),
    var createdAt: Date = Date(),
    var updatedAt: Date = Date(),
    var status: ContentStatus = ContentStatus.DRAFT,
    var tags: List<String> = listOf()
) {
    fun addComment(comment: BlogComment) {
        comments.add(comment)
    }

    fun removeComment(commentId: Int) {
        comments.removeAll { it.id == commentId }
    }

    fun getPublishedComments(): List<BlogComment> {
        return comments.filter { it.status == ContentStatus.PUBLISHED }
    }

    fun updateContent(title: String, content: String) {
        this.title = title
        this.content = content
        this.updatedAt = Date()
    }
}

// Blog class
class Blog {
    private val articles: MutableList<Article> = mutableListOf()
    private val users: MutableList<User> = mutableListOf()

    fun addUser(user: User) {
        users.add(user)
    }

    fun addArticle(article: Article) {
        articles.add(article)
    }

    fun removeArticle(articleId: Int) {
        articles.removeAll { it.id == articleId }
    }

    fun getArticles(status: ContentStatus? = null): List<Article> {
        return if (status != null) {
            articles.filter { it.status == status }
        } else {
            articles
        }
    }

    fun getArticleById(id: Int): Article? {
        return articles.find { it.id == id }
    }

    fun getUserById(id: Int): User? {
        return users.find { it.id == id }
    }

    fun listArticles(page: Int = 1, pageSize: Int = 10): List<Article> {
        return articles
            .filter { it.status == ContentStatus.PUBLISHED }
            .sortedByDescending { it.createdAt }
            .drop((page - 1) * pageSize)
            .take(pageSize)
    }

    fun searchArticles(query: String): List<Article> {
        val lowercaseQuery = query.lowercase()
        return articles.filter {
            it.status == ContentStatus.PUBLISHED &&
            (it.title.lowercase().contains(lowercaseQuery) ||
            it.content.lowercase().contains(lowercaseQuery) ||
            it.tags.any { tag -> tag.lowercase().contains(lowercaseQuery) })
        }
    }
}

// PermissionManager class
object PermissionManager {
    fun canCreateArticle(user: User): Boolean {
        return user.role == UserRole.ADMIN || user.role == UserRole.AUTHOR
    }

    fun canEditArticle(user: User, article: Article): Boolean {
        return user.role == UserRole.ADMIN || user.id == article.author.id
    }

    fun canDeleteArticle(user: User, article: Article): Boolean {
        return user.role == UserRole.ADMIN || user.id == article.author.id
    }

    fun canCreateComment(user: User): Boolean {
        return true // All users can create comments
    }

    fun canEditComment(user: User, comment: BlogComment): Boolean {
        return user.role == UserRole.ADMIN || user.id == comment.author.id
    }

    fun canDeleteComment(user: User, comment: BlogComment): Boolean {
        return user.role == UserRole.ADMIN || user.id == comment.author.id
    }
}

// Usage example
fun main() {
    val blog = Blog()

    val admin = User(1, "admin", "admin@example.com", UserRole.ADMIN)
    val author = User(2, "john_doe", "john@example.com", UserRole.AUTHOR)
    val reader = User(3, "jane_smith", "jane@example.com", UserRole.READER)

    blog.addUser(admin)
    blog.addUser(author)
    blog.addUser(reader)

    val article1 = Article(1, "Introduction to JavaScript", "JavaScript is a versatile programming language...", author, tags = listOf("javascript", "programming"))
    val article2 = Article(2, "Advanced JavaScript Features", "In this article, we'll explore advanced JavaScript features...", author, tags = listOf("javascript", "advanced"))

    if (PermissionManager.canCreateArticle(author)) {
        blog.addArticle(article1)
        blog.addArticle(article2)
        article1.status = ContentStatus.PUBLISHED
        article2.status = ContentStatus.PUBLISHED
    }

    val comment1 = BlogComment(1, "Great article!", reader)
    val comment2 = BlogComment(2, "Thanks for the information.", reader)

    if (PermissionManager.canCreateComment(reader)) {
        article1.addComment(comment1)
        article1.addComment(comment2)
    }

    println("All articles:")
    blog.listArticles().forEach { println(it) }

    println("\nSearch results for 'advanced':")
    blog.searchArticles("advanced").forEach { println(it) }

    if (PermissionManager.canEditArticle(author, article1)) {
        article1.updateContent("Introduction to JavaScript 2023", "JavaScript is a powerful and versatile programming language...")
    }

    if (PermissionManager.canDeleteComment(admin, comment2)) {
        article1.removeComment(comment2.id)
    }

    println("\nUpdated article 1:")
    blog.getArticleById(1)?.let { println(it) }

    println("\nComments for article 1:")
    blog.getArticleById(1)?.getPublishedComments()?.forEach { println(it) }
}

main()
