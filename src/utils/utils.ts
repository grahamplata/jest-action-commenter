export function invariant(
  condition: unknown,
  message?: string
): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}

// commentTemplate
export function commentTemplate(header?: string, message?: string): string {
  const top = `### ${header} Coverage Results \n\n`
  const bottom =
    `<details>\n<summary>Click to expand!</summary>\n\n` +
    `\`\`\`shell\n${message}\`\`\`\n`
  const resp = top + bottom
  return resp
}
