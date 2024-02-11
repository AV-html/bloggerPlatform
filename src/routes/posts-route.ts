import { Router, Request, Response } from "express";
import { PostsRepository } from "../repositories/posts-repository";
import { HTTP_STATUSES, RequestWithBody, RequestWithBodyAndParams, RequestWithParams } from "../models/common";
import { ICreatePost, IUpdatePost } from "../models/posts/input";
import { authMiddleware } from "../middlewares/auth/auth-middleware";
import { postsValidation } from "../validators/posts-validator";

export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response) => {
  const posts = PostsRepository.getAllPosts()

  res.send(posts)
})

postsRouter.post('/', authMiddleware, postsValidation(), (req: RequestWithBody<ICreatePost>, res: Response) => {
  const {blogId, shortDescription, title, content} = req.body

  const newPost = PostsRepository.createPost({blogId, shortDescription, title, content})

  res.status(HTTP_STATUSES.CREATED_201).send(newPost)
})

postsRouter.get('/:id', (req: RequestWithParams, res: Response) => {
  const postId = req.params.id

  const post = PostsRepository.getPostById(postId)

  if (!post) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }

  res.send(post)
})

postsRouter.put('/:id', authMiddleware, postsValidation(), (req: RequestWithBodyAndParams<IUpdatePost>, res: Response) => {
  const postId = req.params.id

  const post = PostsRepository.getPostById(postId)

  if (!post) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }

  const {blogId, shortDescription, title, content} = req.body

  PostsRepository.updatePost(postId, {blogId, shortDescription, title, content})

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

postsRouter.delete('/:id', authMiddleware, (req: RequestWithParams, res) => {
  const postId = req.params.id

  const post = PostsRepository.getPostById(postId)

  if (!post) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }

  PostsRepository.removePostById(postId)

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

