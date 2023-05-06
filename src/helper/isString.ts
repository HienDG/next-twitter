const isString = (payload: unknown): payload is string => typeof payload === "string";

export default isString;
