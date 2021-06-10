import * as core from '@actions/core'
import { context, getOctokit } from '@actions/github'
import { invariant } from '../libs/utils'

// handlePullRequestMessage
export async function handlePullRequestMessage(
  body: string,
  githubToken: string,
  workDir: string,
  editCommentOnPr?: boolean
): Promise<void> {
  const { payload, repo } = context
  invariant(payload.pull_request, 'Missing pull request event data.')
  const octokit = getOctokit(githubToken)
  const { data: comments } = await octokit.rest.issues.listComments({
    ...repo,
    issue_number: payload.pull_request.number
  })
  const search = `### ${workDir} Coverage Results `
  const comment = comments.find(item => item.body?.startsWith(search))

  if (body && githubToken) {
    if (comment && editCommentOnPr) {
      core.debug(`Updating comment on pull request...`)
      await octokit.rest.issues.updateComment({
        ...repo,
        comment_id: comment.id,
        body
      })
    } else {
      core.debug(`Commenting on pull request...`)
      await octokit.rest.issues.createComment({
        ...repo,
        issue_number: payload.pull_request.number,
        body
      })
    }
  }
}
