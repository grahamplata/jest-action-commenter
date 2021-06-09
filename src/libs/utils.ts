import * as core from '@actions/core'
import { exec } from '@actions/exec'

export function invariant(
  condition: unknown,
  message?: string
): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}

// handleComment
export function handleComment(header?: string, message?: string): string {
  core.debug(`Building comment...`)
  const top = `### ${header} Coverage Results \n\n`
  const bottom =
    `<details>\n<summary>Click to expand!</summary>\n\n` +
    `\`\`\`shell\n${message}\`\`\`\n`
  const resp = top + bottom
  return resp
}

export async function handleCommand(
  command: string,
  dir: string
): Promise<string> {
  let commandBuffer = ''
  const execOptions = {
    cwd: dir,
    listeners: {
      stdout: (data: Buffer) => {
        commandBuffer += data.toString()
      }
    }
  }

  core.debug(`Exec ${command}...`)
  await exec(command, [], execOptions)
  return commandBuffer
}

export function parseUndefined(input: string): string | undefined {
  return input === undefined || input === '' ? undefined : input
}

export function parseBoolean(input: string): boolean | undefined {
  return parseUndefined(input) ? input === 'true' : undefined
}
