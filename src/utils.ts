import { context, getOctokit } from '@actions/github'

export function invariant(
  condition: unknown,
  message?: string
): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}

export async function handlePullRequestMessage(
  body: string,
  githubToken: string,
  editCommentOnPr?: boolean
): Promise<void> {
  const { payload, repo } = context
  invariant(payload.pull_request, 'Missing pull request event data.')
  const text = `#### :tropical_drink: `
  const octokit = getOctokit(githubToken)
  const { data: comments } = await octokit.rest.issues.listComments({
    ...repo,
    issue_number: payload.pull_request.number
  })
  // eslint-disable-next-line no-shadow
  const comment = comments.find(comment => comment.body?.startsWith(text))

  if (body && githubToken) {
    if (comment && editCommentOnPr) {
      await octokit.rest.issues.updateComment({
        ...repo,
        comment_id: comment.id,
        body
      })
    } else {
      await octokit.rest.issues.createComment({
        ...repo,
        issue_number: payload.pull_request.number,
        body
      })
    }
  }
}
