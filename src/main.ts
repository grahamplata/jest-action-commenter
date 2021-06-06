import { resolve } from 'path'
import { exec } from '@actions/exec'
import * as core from '@actions/core'
import { makeConfig, makeListener } from './config'
import { environmentVariables } from './utils/env'
import { invariant, commentTemplate } from './utils/utils'
import { handlePullRequestMessage } from './github/pr'

async function main(): Promise<void> {
  const commandResult = ''
  const { githubToken, command, workDir } = await makeConfig()
  core.debug(`Loading Config...`)
  invariant(githubToken, 'github-token is missing.')

  const dir = resolve(environmentVariables.GITHUB_WORKSPACE, workDir)
  core.debug(`Working directory resolved at ${dir}`)

  const execOptions = makeListener(dir, commandResult)
  await exec(command, [], execOptions)

  core.debug(`Building comment...`)
  const comment = commentTemplate(workDir, commandResult)

  core.debug(`Commenting on pull request...`)
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
