import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {project} from './project'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, project],
}
