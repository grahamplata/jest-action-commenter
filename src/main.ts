import { resolve } from 'path'
import * as core from '@actions/core'
import { makeConfig } from './config'
import { environmentVariables } from './utils/env'
import { invariant, handleComment, handleCommand } from './utils/utils'
import { handlePullRequestMessage } from './github/pr'

async function main(): Promise<void> {
  core.debug(`Start Main...`)
  const { githubToken, command, workDir } = await makeConfig()
  core.debug(`Loading Config...`)
  invariant(githubToken, 'github-token is missing.')

  const dir = resolve(environmentVariables.GITHUB_WORKSPACE, workDir)
  const commandBuffer = await handleCommand(command, dir)
  const comment = handleComment(dir, commandBuffer)

  handlePullRequestMessage(comment, githubToken)
  core.endGroup()
}

// Main Loop
;(async () => {
  try {
    await main()
  } catch (err) {
    if (err.message.stderr) {
      core.setFailed(err.message.stderr)
    } else {
      core.setFailed(err.message)
    }
  }
})()
