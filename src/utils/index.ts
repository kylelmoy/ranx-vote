/**
 * Generate a string of random alphanumeric characters
 * @param length Length of string to generate
 * @returns String of the specified length
 */
export async function generateCode(length: number): Promise<string> {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}