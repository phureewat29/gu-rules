import { RootUnion } from '../types/union';
import { generateErrorMessage } from 'zod-error';
import { rootSchema } from '../validations/union';

/**
 * Validates a root union before running it.
 * @export
 * @param {RootUnion} root
 * @return {*}  {({ isValid: true } | { isValid: false; reason: string })}
 */
export function validate(root: RootUnion): { isValid: true } | { isValid: false; reason: string } {
  const validated = rootSchema.safeParse(root);

  if (!validated.success) {
    return { isValid: false, reason: generateErrorMessage(validated.error.issues) };
  }

  return { isValid: true };
}
