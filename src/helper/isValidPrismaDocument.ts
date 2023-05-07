const isValidPrismaDocument = <T>(payload: T | null): payload is T =>
	typeof payload === "object" && payload !== null;
export default isValidPrismaDocument;
