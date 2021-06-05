import { resolve } from 'path'
import { execSync } from 'child_process'
import * as core from '@actions/core'
import { makeConfig } from './config'
import { environmentVariables } from './utils/env'
import { invariant } from './utils/utils'

import { handlePullRequestMessage } from './github/pr'

async function main(): Promise<void> {
  const { githubToken, command, workDir } = await makeConfig()
  core.debug(`Loading Config...`)

  invariant(githubToken, 'github-token is missing.')

  const dir = resolve(environmentVariables.GITHUB_WORKSPACE, workDir)
  core.debug(`Working directory resolved at ${dir}`)

  const commandResult = execSync(command, { stdio: 'inherit' }).toString()
  // core.debug(`commandResult should be here-- ${commandResult}`)

  // core.debug(`Building comment...`)
  // const comment = commentTemplate(workDir, commandResult)

  // core.debug(`Built comment... ${comment}`)
  // core.debug(`Commenting on pull request...`)
  handlePullRequestMessage(commandResult, githubToken)

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
