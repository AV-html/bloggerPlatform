import { db } from "../db/db";
import { ICreatePost, IUpdatePost } from "../models/posts/input";
import { IPost } from "../models/posts/output";
import { BlogsRepository } from "./blogs-repository";

export class PostsRepository {
  static getAllPosts() {
    return db.posts
  }

  static createPost(data: ICreatePost) {
    const blog = BlogsRepository.getBlogById(data.blogId) as IBlog

    const newPost: IPost = {
      ...data,
      blogName: blog.name,
      id: `${(new Date()).getTime()}`
    }

    db.posts.push(newPost)
    return newPost
  }

  static getPostById(postId: string) {
    return db.posts.find((post) => post.id === postId)
  }

  static updatePost(postId: string, data: IUpdatePost) {
    db.posts = db.posts.map((post) => {
      return post.id === postId
        ? {...post, ...data}
        : post
    })
  }

  static removePostById(postId: string) {
    db.posts = db.posts.filter((post) => post.id !== postId)
  }
}
