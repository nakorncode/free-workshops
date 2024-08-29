package main

import (
	"fmt"
	"sort"
	"strings"
	"time"
)

// Enums
const (
	ADMIN = iota
	AUTHOR
	READER
)

const (
	DRAFT = iota
	PUBLISHED
	ARCHIVED
)

// User struct
type User struct {
	ID       int
	Username string
	Email    string
	Role     int
}

func (u *User) GetID() int {
	return u.ID
}

func (u *User) GetUsername() string {
	return u.Username
}

func (u *User) GetRole() int {
	return u.Role
}

func (u *User) SetRole(role int) {
	u.Role = role
}

// BlogComment struct
type BlogComment struct {
	ID        int
	Content   string
	Author    User
	CreatedAt time.Time
	UpdatedAt time.Time
	Status    int
}

func (c *BlogComment) GetID() int {
	return c.ID
}

func (c *BlogComment) GetContent() string {
	return c.Content
}

func (c *BlogComment) GetAuthor() User {
	return c.Author
}

func (c *BlogComment) GetCreatedAt() time.Time {
	return c.CreatedAt
}

func (c *BlogComment) GetUpdatedAt() time.Time {
	return c.UpdatedAt
}

func (c *BlogComment) GetStatus() int {
	return c.Status
}

func (c *BlogComment) SetStatus(status int) {
	c.Status = status
	c.UpdatedAt = time.Now()
}

func (c *BlogComment) UpdateContent(content string) {
	c.Content = content
	c.UpdatedAt = time.Now()
}

// Article struct
type Article struct {
	ID        int
	Title     string
	Content   string
	Author    User
	Comments  []BlogComment
	CreatedAt time.Time
	UpdatedAt time.Time
	Status    int
	Tags      []string
}

func (a *Article) GetID() int {
	return a.ID
}

func (a *Article) GetTitle() string {
	return a.Title
}

func (a *Article) GetContent() string {
	return a.Content
}

func (a *Article) GetAuthor() User {
	return a.Author
}

func (a *Article) GetCreatedAt() time.Time {
	return a.CreatedAt
}

func (a *Article) GetUpdatedAt() time.Time {
	return a.UpdatedAt
}

func (a *Article) GetStatus() int {
	return a.Status
}

func (a *Article) SetStatus(status int) {
	a.Status = status
	a.UpdatedAt = time.Now()
}

func (a *Article) GetTags() []string {
	return a.Tags
}

func (a *Article) AddComment(comment BlogComment) {
	a.Comments = append(a.Comments, comment)
}

func (a *Article) RemoveComment(commentID int) {
	var filteredComments []BlogComment
	for _, comment := range a.Comments {
		if comment.GetID() != commentID {
			filteredComments = append(filteredComments, comment)
		}
	}
	a.Comments = filteredComments
}

func (a *Article) GetComments() []BlogComment {
	var publishedComments []BlogComment
	for _, comment := range a.Comments {
		if comment.GetStatus() == PUBLISHED {
			publishedComments = append(publishedComments, comment)
		}
	}
	return publishedComments
}

func (a *Article) UpdateContent(title, content string) {
	a.Title = title
	a.Content = content
	a.UpdatedAt = time.Now()
}

// Blog struct
type Blog struct {
	Articles []Article
	Users    []User
}

func (b *Blog) AddUser(user User) {
	b.Users = append(b.Users, user)
}

func (b *Blog) AddArticle(article Article) {
	b.Articles = append(b.Articles, article)
}

func (b *Blog) RemoveArticle(articleID int) {
	var filteredArticles []Article
	for _, article := range b.Articles {
		if article.GetID() != articleID {
			filteredArticles = append(filteredArticles, article)
		}
	}
	b.Articles = filteredArticles
}

func (b *Blog) GetArticles(status *int) []Article {
	var result []Article
	for _, article := range b.Articles {
		if status == nil || article.GetStatus() == *status {
			result = append(result, article)
		}
	}
	return result
}

func (b *Blog) GetArticleByID(id int) *Article {
	for _, article := range b.Articles {
		if article.GetID() == id {
			return &article
		}
	}
	return nil
}

func (b *Blog) GetUserByID(id int) *User {
	for _, user := range b.Users {
		if user.GetID() == id {
			return &user
		}
	}
	return nil
}

func (b *Blog) ListArticles(page, pageSize int) []Article {
	startIndex := (page - 1) * pageSize
	endIndex := startIndex + pageSize
	var publishedArticles []Article
	for _, article := range b.Articles {
		if article.GetStatus() == PUBLISHED {
			publishedArticles = append(publishedArticles, article)
		}
	}
	// Sorting articles by CreatedAt in descending order
	sort.Slice(publishedArticles, func(i, j int) bool {
		return publishedArticles[i].GetCreatedAt().After(publishedArticles[j].GetCreatedAt())
	})
	if endIndex > len(publishedArticles) {
		endIndex = len(publishedArticles)
	}
	return publishedArticles[startIndex:endIndex]
}

func (b *Blog) SearchArticles(query string) []Article {
	lowercaseQuery := strings.ToLower(query)
	var result []Article
	for _, article := range b.Articles {
		if article.GetStatus() == PUBLISHED &&
			(strings.Contains(strings.ToLower(article.GetTitle()), lowercaseQuery) ||
				strings.Contains(strings.ToLower(article.GetContent()), lowercaseQuery) ||
				containsTag(lowercaseQuery, article.GetTags())) {
			result = append(result, article)
		}
	}
	return result
}

func containsTag(query string, tags []string) bool {
	for _, tag := range tags {
		if strings.Contains(strings.ToLower(tag), query) {
			return true
		}
	}
	return false
}

// PermissionManager struct
type PermissionManager struct{}

func (pm *PermissionManager) CanCreateArticle(user *User) bool {
	return user.GetRole() == ADMIN || user.GetRole() == AUTHOR
}

func (pm *PermissionManager) CanEditArticle(user *User, article *Article) bool {
	return user.GetRole() == ADMIN || user.GetID() == article.GetAuthor().GetID()
}

func (pm *PermissionManager) CanDeleteArticle(user *User, article *Article) bool {
	return user.GetRole() == ADMIN || user.GetID() == article.GetAuthor().GetID()
}

func (pm *PermissionManager) CanCreateComment(user *User) bool {
	return true // All users can create comments
}

func (pm *PermissionManager) CanEditComment(user *User, comment *BlogComment) bool {
	return user.GetRole() == ADMIN || user.GetID() == comment.GetAuthor().GetID()
}

func (pm *PermissionManager) CanDeleteComment(user *User, comment *BlogComment) bool {
	return user.GetRole() == ADMIN || user.GetID() == comment.GetAuthor().GetID()
}

func main() {
	blog := Blog{}

	admin := User{1, "admin", "admin@example.com", ADMIN}
	author := User{2, "john_doe", "john@example.com", AUTHOR}
	reader := User{3, "jane_smith", "jane@example.com", READER}

	blog.AddUser(admin)
	blog.AddUser(author)
	blog.AddUser(reader)

	article1 := Article{1, "Introduction to JavaScript", "JavaScript is a versatile programming language...", author, nil, time.Now(), time.Now(), DRAFT, []string{"javascript", "programming"}}
	article2 := Article{2, "Advanced JavaScript Features", "In this article, we'll explore advanced JavaScript features...", author, nil, time.Now(), time.Now(), DRAFT, []string{"javascript", "advanced"}}

	pm := PermissionManager{}

	if pm.CanCreateArticle(&author) {
		blog.AddArticle(article1)
		blog.AddArticle(article2)
		article1.SetStatus(PUBLISHED)
		article2.SetStatus(PUBLISHED)
	}

	comment1 := BlogComment{1, "Great article!", reader, time.Now(), time.Now(), PUBLISHED}
	comment2 := BlogComment{2, "Thanks for the information.", reader, time.Now(), time.Now(), PUBLISHED}

	if pm.CanCreateComment(&reader) {
		article1.AddComment(comment1)
		article1.AddComment(comment2)
	}

	fmt.Println("All articles:")
	for _, article := range blog.ListArticles(1, 10) {
		fmt.Printf("%+v\n", article)
	}

	fmt.Println("\nSearch results for 'advanced':")
	for _, article := range blog.SearchArticles("advanced") {
		fmt.Printf("%+v\n", article)
	}

	if pm.CanEditArticle(&author, &article1) {
		article1.UpdateContent("Introduction to JavaScript 2023", "JavaScript is a powerful and versatile programming language...")
	}

	if pm.CanDeleteComment(&admin, &comment2) {
		article1.RemoveComment(comment2.GetID())
	}

	fmt.Println("\nUpdated article 1:")
	if updatedArticle := blog.GetArticleByID(1); updatedArticle != nil {
		fmt.Printf("%+v\n", *updatedArticle)
	}

	fmt.Println("\nComments for article 1:")
	if updatedArticle := blog.GetArticleByID(1); updatedArticle != nil {
		for _, comment := range updatedArticle.GetComments() {
			fmt.Printf("%+v\n", comment)
		}
	}
}
