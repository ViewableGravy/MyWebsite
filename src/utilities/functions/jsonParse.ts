import { ZodAny, z } from "zod";

/**
 * Provides an object from a stringified JSON. If the string is not a valid JSON,
 * it returns an object with an error property opposed to throwing
 */
export const jsonParse = (data?: string, validator?: z.ZodTypeAny) => {
    if (!data) return null;
    
    try {
        const result = JSON.parse(data);

        if (validator) {
            return validator.parse(result);
        } else {
            return result;
        }
    } catch (error) {
        return { error };
    }
}