import { Request } from 'express'

// Request<Params, ResBody, ReqBody, ReqQuery>
export type RequestWithParams<P = { id: string }> = Request<P>
export type RequestWithQuery<Q> = Request<{}, {}, {}, Q>
export type RequestWithBody<B> = Request<{}, {}, B, {}>
export type RequestWithBodyAndParams<B, P = { id: string }> = Request<P, {}, B>

export enum HTTP_STATUSES {
  OK_200 = 200,
  CREATED_201 = 201,
  NO_CONTENT_204 = 204,

  BAD_REQUEST_400 = 400,
  NOT_AUTHORIZED_401 = 401,
  NOT_FOUND_404 = 404
}
