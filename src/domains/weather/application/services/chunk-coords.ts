export function chunkCoords<T>(coords: T[], size: number): T[][] {
    if (size <= 0) throw new Error("Heap size must be greater than 0");

    const result: T[][] = [];

    for (let i = 0; i < coords.length; i += size) {
        result.push(coords.slice(i, i + size));
    }

    return result;
}
