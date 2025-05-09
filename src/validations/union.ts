import { Union } from '../types/union';
import { ruleSchema } from './rule';
import { z } from 'zod';

export const unionSchema: z.ZodType<Union> = z.object({
  entity: z.literal('union'),
  id: z.string(),
  parent_id: z.string(),
  connector: z.union([z.literal('and'), z.literal('or')]),
  rules: z.array(ruleSchema.or(z.lazy(() => unionSchema))),
});

export const rootSchema = z.object({
  entity: z.literal('root'),
  id: z.string(),
  connector: z.union([z.literal('and'), z.literal('or')]),
  rules: z.array(ruleSchema.or(unionSchema)),
});

export const newUnionSchema = rootSchema.pick({
  connector: true,
});
