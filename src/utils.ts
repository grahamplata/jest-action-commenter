import { context, getOctokit } from '@actions/github'

export function invariant(
  condition: unknown,
  message?: string
): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}

// handlePullRequestMessage
export async function handlePullRequestMessage(
  body: string,
  githubToken: string
): Promise<void> {
  const { payload, repo } = context
  invariant(payload.pull_request, 'Missing pull request event data.')

  const octokit = getOctokit(githubToken)
  if (body && githubToken) {
    await octokit.rest.issues.createComment({
      ...repo,
      issue_number: payload.pull_request.number,
      body
    })
  }
}
