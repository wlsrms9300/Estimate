type TransformFunction = {
    toCamelCase: (data: any) => any
    toSnakeCase: (data: any) => any
}

export const transformData: TransformFunction = {
    toCamelCase(data: any): any {
        if (Array.isArray(data)) {
            return data.map((item) => transformData.toCamelCase(item))
        } else if (data !== null && typeof data === 'object') {
            const transformed: any = {}
            Object.keys(data).forEach((key) => {
                const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
                transformed[camelKey] = transformData.toCamelCase(data[key])
            })
            return transformed
        }
        return data
    },

    toSnakeCase(data: any): any {
        if (Array.isArray(data)) {
            return data.map((item) => transformData.toSnakeCase(item))
        } else if (data !== null && typeof data === 'object') {
            const transformed: any = {}
            Object.keys(data).forEach((key) => {
                const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
                transformed[snakeKey] = transformData.toSnakeCase(data[key])
            })
            return transformed
        }
        return data
    },
}
