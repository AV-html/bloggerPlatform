import { Router, Request, Response } from "express";
import { BlogsRepository } from "../repositories/blogs-repository";
import { HTTP_STATUSES, RequestWithBody, RequestWithBodyAndParams, RequestWithParams } from "../models/common";
import { authMiddleware } from "../middlewares/auth/auth-middleware";
import { blogsValidation } from "../validators/blogs-validator";
import { ICreateBlog, IUpdateBlog } from "../models/blogs/input";

export const blogsRoute = Router({})

blogsRoute.get('/', (req: Request, res: Response) => {
  const blogs = BlogsRepository.getAllBlogs()

  res.send(blogs)
})

blogsRoute.get('/:id', (req: RequestWithParams, res: Response) => {
  const blogId = req.params.id

  const blog = BlogsRepository.getBlogById(blogId)

  if (!blog) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }

  res.send(blog)
})

blogsRoute.post('/', authMiddleware, blogsValidation(), (req: RequestWithBody<ICreateBlog>, res: Response) => {
  const {name, description, websiteUrl} = req.body

  const blog = BlogsRepository.createBlog(name, description, websiteUrl)

  res.status(HTTP_STATUSES.CREATED_201).send(blog)
})

blogsRoute.put('/:id', authMiddleware, blogsValidation(), (req: RequestWithBodyAndParams<IUpdateBlog>, res: Response) => {
  const blogId = req.params.id
  const blog = BlogsRepository.getBlogById(blogId)
  if (!blog) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }

  const {name, description, websiteUrl} = req.body

  BlogsRepository.updateBlog(blogId, name, description, websiteUrl)

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

blogsRoute.delete('/:id', authMiddleware, (req: RequestWithParams, res: Response) => {
  const blogId = req.params.id
  const blog = BlogsRepository.getBlogById(blogId)
  if (!blog) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }

  BlogsRepository.removeBlogById(blogId)

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})
