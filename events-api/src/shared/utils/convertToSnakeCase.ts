export function convertToSnakeCase(s: string) {
    const arr = s.split("");
    for (let i = 1; i < arr.length; ++i) {
        let ch = arr[i]!;
        if (ch < "a") {
            arr[i] = `_${ch.toLowerCase()}`;
        }
    }

    return arr.join("");
}
