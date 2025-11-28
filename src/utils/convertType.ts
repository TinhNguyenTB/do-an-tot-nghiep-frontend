export function convertType<T extends Record<string, any>>(
  obj: Record<string, any>,
  template: T
): T {
  const result: any = {}

  for (const key in template) {
    const templateType = typeof template[key]
    const value = obj[key]

    switch (templateType) {
      case 'string':
        result[key] = String(value)
        break

      case 'number':
        result[key] = Number(value)
        break

      case 'boolean':
        result[key] = value === 'true' || value === true
        break

      default:
        result[key] = value
    }
  }

  return result as T
}
