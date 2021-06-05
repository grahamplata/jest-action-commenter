import { resolve } from 'path'
import * as core from '@actions/core'
import { makeConfig } from './config'
import { environmentVariables } from './env'
import { handlePullRequestMessage, invariant } from './utils'

async function main(): Promise<void> {
  const config = await makeConfig()
  core.debug(`Loading Config ...`)

  const workDir = resolve(environmentVariables.GITHUB_WORKSPACE, config.workDir)
  core.debug(`Working directory resolved at ${workDir}`)

  invariant(config.githubToken, 'github-token is missing.')

  core.debug(`Commenting on pull request`)
  handlePullRequestMessage('', config.githubToken)

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
