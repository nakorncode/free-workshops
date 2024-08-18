from datetime import datetime
from typing import List, Optional

class UserRole:
    ADMIN = 0
    AUTHOR = 1
    READER = 2

class ContentStatus:
    DRAFT = 0
    PUBLISHED = 1
    ARCHIVED = 2

class User:
    def __init__(self, id: int, username: str, email: str, role: int):
        self.id = id
        self.username = username
        self.email = email
        self.role = role

    def get_id(self) -> int:
        return self.id

    def get_username(self) -> str:
        return self.username

    def get_role(self) -> int:
        return self.role

    def set_role(self, role: int) -> None:
        self.role = role

class BlogComment:
    def __init__(self, id: int, content: str, author: User):
        self.id = id
        self.content = content
        self.author = author
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.status = ContentStatus.PUBLISHED

    def get_id(self) -> int:
        return self.id

    def get_content(self) -> str:
        return self.content

    def get_author(self) -> User:
        return self.author

    def get_created_at(self) -> datetime:
        return self.created_at

    def get_updated_at(self) -> datetime:
        return self.updated_at

    def get_status(self) -> int:
        return self.status

    def set_status(self, status: int) -> None:
        self.status = status
        self.updated_at = datetime.now()

    def update_content(self, content: str) -> None:
        self.content = content
        self.updated_at = datetime.now()

class Article:
    def __init__(self, id: int, title: str, content: str, author: User, tags: Optional[List[str]] = None):
        if tags is None:
            tags = []
        self.id = id
        self.title = title
        self.content = content
        self.author = author
        self.comments = []
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.status = ContentStatus.DRAFT
        self.tags = tags

    def get_id(self) -> int:
        return self.id

    def get_title(self) -> str:
        return self.title

    def get_content(self) -> str:
        return self.content

    def get_author(self) -> User:
        return self.author

    def get_created_at(self) -> datetime:
        return self.created_at

    def get_updated_at(self) -> datetime:
        return self.updated_at

    def get_status(self) -> int:
        return self.status

    def set_status(self, status: int) -> None:
        self.status = status
        self.updated_at = datetime.now()

    def get_tags(self) -> List[str]:
        return self.tags

    def add_comment(self, comment: BlogComment) -> None:
        self.comments.append(comment)

    def remove_comment(self, comment_id: int) -> None:
        self.comments = [comment for comment in self.comments if comment.get_id() != comment_id]

    def get_comments(self) -> List[BlogComment]:
        return [comment for comment in self.comments if comment.get_status() == ContentStatus.PUBLISHED]

    def update_content(self, title: str, content: str) -> None:
        self.title = title
        self.content = content
        self.updated_at = datetime.now()

class Blog:
    def __init__(self):
        self.articles = []
        self.users = []

    def add_user(self, user: User) -> None:
        self.users.append(user)

    def add_article(self, article: Article) -> None:
        self.articles.append(article)

    def remove_article(self, article_id: int) -> None:
        self.articles = [article for article in self.articles if article.get_id() != article_id]

    def get_articles(self, status: Optional[int] = None) -> List[Article]:
        if status is not None:
            return [article for article in self.articles if article.get_status() == status]
        return self.articles

    def get_article_by_id(self, id: int) -> Optional[Article]:
        for article in self.articles:
            if article.get_id() == id:
                return article
        return None

    def get_user_by_id(self, id: int) -> Optional[User]:
        for user in self.users:
            if user.get_id() == id:
                return user
        return None

    def list_articles(self, page: int = 1, page_size: int = 10) -> List[Article]:
        start_index = (page - 1) * page_size
        end_index = start_index + page_size
        return sorted(
            [article for article in self.articles if article.get_status() == ContentStatus.PUBLISHED],
            key=lambda a: a.get_created_at(),
            reverse=True
        )[start_index:end_index]

    def search_articles(self, query: str) -> List[Article]:
        lowercase_query = query.lower()
        return [
            article for article in self.articles
            if article.get_status() == ContentStatus.PUBLISHED and
               (lowercase_query in article.get_title().lower() or
                lowercase_query in article.get_content().lower() or
                any(lowercase_query in tag.lower() for tag in article.get_tags()))
        ]

class PermissionManager:
    @staticmethod
    def can_create_article(user: User) -> bool:
        return user.get_role() in [UserRole.ADMIN, UserRole.AUTHOR]

    @staticmethod
    def can_edit_article(user: User, article: Article) -> bool:
        return user.get_role() == UserRole.ADMIN or user.get_id() == article.get_author().get_id()

    @staticmethod
    def can_delete_article(user: User, article: Article) -> bool:
        return user.get_role() == UserRole.ADMIN or user.get_id() == article.get_author().get_id()

    @staticmethod
    def can_create_comment(user: User) -> bool:
        return True  # All users can create comments

    @staticmethod
    def can_edit_comment(user: User, comment: BlogComment) -> bool:
        return user.get_role() == UserRole.ADMIN or user.get_id() == comment.get_author().get_id()

    @staticmethod
    def can_delete_comment(user: User, comment: BlogComment) -> bool:
        return user.get_role() == UserRole.ADMIN or user.get_id() == comment.get_author().get_id()

# Usage example
blog = Blog()

admin = User(1, "admin", "admin@example.com", UserRole.ADMIN)
author = User(2, "john_doe", "john@example.com", UserRole.AUTHOR)
reader = User(3, "jane_smith", "jane@example.com", UserRole.READER)

blog.add_user(admin)
blog.add_user(author)
blog.add_user(reader)

article1 = Article(1, "Introduction to JavaScript", "JavaScript is a versatile programming language...", author, ["javascript", "programming"])
article2 = Article(2, "Advanced JavaScript Features", "In this article, we'll explore advanced JavaScript features...", author, ["javascript", "advanced"])

if PermissionManager.can_create_article(author):
    blog.add_article(article1)
    blog.add_article(article2)
    article1.set_status(ContentStatus.PUBLISHED)
    article2.set_status(ContentStatus.PUBLISHED)

comment1 = BlogComment(1, "Great article!", reader)
comment2 = BlogComment(2, "Thanks for the information.", reader)

if PermissionManager.can_create_comment(reader):
    article1.add_comment(comment1)
    article1.add_comment(comment2)

print("All articles:")
print(blog.list_articles())

print("\nSearch results for 'advanced':")
print(blog.search_articles("advanced"))

if PermissionManager.can_edit_article(author, article1):
    article1.update_content("Introduction to JavaScript 2023", "JavaScript is a powerful and versatile programming language...")

if PermissionManager.can_delete_comment(admin, comment2):
    article1.remove_comment(comment2.get_id())

print("\nUpdated article 1:")
print(blog.get_article_by_id(1))

print("\nComments for article 1:")
print(blog.get_article_by_id(1).get_comments())
