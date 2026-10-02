export const makeCapitalName = (name: string) => {
    const result = name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    return result
}