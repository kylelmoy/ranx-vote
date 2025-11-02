/**
 * Generate a string of random alphanumeric characters
 * @param length Length of string to generate
 * @returns String of the specified length
 */
export function generateCode(length: number): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}