import * as core from '@actions/core'
import { context, getOctokit } from '@actions/github'

// filesChanged
export async function filesChanged(
  githubToken: string
): Promise<string[] | undefined> {
  core.info(`Checking what files changed...`)

  // New GitHub client
  const client = getOctokit(githubToken)

  // Extract sha
  const base = context.payload.pull_request?.base?.sha
  const head = context.payload.pull_request?.head?.sha

  // Log the base and head commits
  core.debug(`Base commit: ${base}`)
  core.debug(`Head commit: ${head}`)

  // Use GitHub's compare two commits API via OktoKit.
  // https://docs.github.com/en/rest/reference/repos#compare-two-commits
  const response = await client.rest.repos.compareCommits({
    base,
    head,
    owner: context.repo.owner,
    repo: context.repo.repo
  })

  // Check that the request was successful.
  if (response.status !== 200) {
    core.setFailed(
      `GitHub compareCommits() failed ${context.eventName}. Event returned ${response.status}, expected 200.`
    )
  }

  // Handle files and collect names
  const files = response.data.files
  const fileNames = files?.map(file => {
    return file.filename
  })

  return fileNames
}
