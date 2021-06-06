import * as core from '@actions/core'
import { context, getOctokit } from '@actions/github'
import { invariant } from '../libs/utils'

// handlePullRequestMessage
export async function handlePullRequestMessage(
  body: string,
  githubToken: string
): Promise<void> {
  const { payload, repo } = context
  invariant(payload.pull_request, 'Missing pull request event data.')

  const octokit = getOctokit(githubToken)
  if (body && githubToken) {
    core.debug(`Commenting on pull request...`)
    await octokit.rest.issues.createComment({
      ...repo,
      issue_number: payload.pull_request.number,
      body
    })
  }
}
