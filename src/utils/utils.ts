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
  let comment = ''
  if (header) {
    comment = `### ${header} Coverage Results \n`
  }
  ;`${comment}<details>\n<summary>Click to expand!</summary>\n\n` +
    `\`\`\`shell\n${message}\`\`\`\n`

  return comment
}
