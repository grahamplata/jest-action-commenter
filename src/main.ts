import { resolve } from 'path'
import * as core from '@actions/core'
import { makeConfig } from './config'
import { environmentVariables } from './libs/env'
import { filesChanged } from './libs/files'
import { invariant, handleComment, handleCommand } from './libs/utils'
import { handlePullRequestMessage } from './github/pr'

async function main(): Promise<void> {
  core.debug(`Start Main...`)
  let changed: string[] | undefined
  const { githubToken, command, workDir, editCommentOnPr, changedSinceMaster } =
    await makeConfig()

  core.debug(`Loading Config...`)
  invariant(githubToken, 'github-token is missing.')

  const dir = resolve(environmentVariables.GITHUB_WORKSPACE, workDir)

  if (changedSinceMaster) {
    changed = await filesChanged(githubToken)
  }

  const commandBuffer = await handleCommand(command, dir, changed)
  const comment = handleComment(workDir, commandBuffer)

  handlePullRequestMessage(comment, githubToken, workDir, editCommentOnPr)
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
