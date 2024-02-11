import { IPost } from "../posts/output";

export interface IDB {
  blogs: IBlog[]
  posts: IPost[]
}


const uri = process.env.MONGO_URI || 'mongo DB link'
