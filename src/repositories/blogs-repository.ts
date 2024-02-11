import { db } from "../db/db";

export class BlogsRepository {
  static getAllBlogs() {
    return db.blogs
  }

  static getBlogById(id: string) {
    return db.blogs.find((item) => item.id === id)
  }

  static createBlog(name: string, description: string, websiteUrl: string) {
    const newBlog: IBlog = {
      name,
      description,
      websiteUrl,
      id: `${(new Date()).getTime()}`
    }
    db.blogs.push(newBlog)
    return newBlog
  }

  static updateBlog(blogId: string, name: string, description: string, websiteUrl: string) {
    db.blogs = db.blogs.map((blog) => {
      return blog.id === blogId
        ? {...blog, name, description, websiteUrl}
        : blog
    })
  }

  static removeBlogById(id: string) {
    db.blogs = db.blogs.filter((blog) => blog.id !== id)
  }
}
