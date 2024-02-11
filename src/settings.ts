import express, {Request, Response} from "express";

import { blogsRoute } from "./routes/blogs-route";
import { postsRouter } from "./routes/posts-route";
import { HTTP_STATUSES } from "./models/common";
import { db } from "./db/db";

export const app = express()
app.use(express.json())
app.use('/blogs', blogsRoute)
app.use('/posts', postsRouter)

app.get('/', (req: Request, res: Response) => {
    let helloWorld = 'Hello World!';
    res.send(helloWorld)
})

app.delete('/testing/all-data', (req: Request, res: Response) => {
    db.blogs = []
    db.posts = []

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})
