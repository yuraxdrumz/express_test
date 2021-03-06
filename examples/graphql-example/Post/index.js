import postSchema from './schema'
import postResolver from './resolver'

export default function PostSchema (app) {
  return app
  .createGraphQlSchema(postSchema)
  .resolver(postResolver)
  .query(`Post(id: Int!): Post`)
  .mutation(`Post(input: newPost): Post`)
  .subscription(`postAdded(id: Int!): Post`)
}
