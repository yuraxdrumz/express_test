import Bliz, { SchemaDirectiveVisitor, defaultFieldResolver } from '../../src/main'

import PostSchema from './Post'
import UserSchema from './User'
import directiveResolvers from './directives'
const app = Bliz()

const firstNameValidator = ({ directiveArgs, resolve, source, args, context, info }) => {
    if(directiveArgs.name !== args.input.first_name){
        throw new Error('name not valid')
    } else {
        return resolve(source, args, context, info)
    }
}

app
.prettyPrint()
.graphql({useGraphql: true, allowPartialRemoteSchema: true, useGraphiql: true, tracing: true})
.registerGraphQlSchemas(UserSchema(app), PostSchema(app))
.enum({name: 'Height', options: ['tall', 'short', 'average']})
.enum({name: 'Role', options: ['Admin', 'User']})
.directive({name: 'firstNameValidator', fn: firstNameValidator})
.listen(4001)
