import { getInput } from '@actions/core'
import * as rt from 'runtypes'
import { parseBoolean } from './libs/utils'

// config
export const config = rt.Record({
  // Options
  command: rt.String,
  workDir: rt.String,
  githubToken: rt.String,
  editCommentOnPr: rt.Boolean
})

// Config
export type Config = rt.Static<typeof config>

// makeConfig
export async function makeConfig(): Promise<Config> {
  return config.check({
    githubToken: getInput('github-token', { required: true }),
    command: getInput('test-command', { required: true }),
    workDir: getInput('work-dir') || './',
    editCommentOnPr: parseBoolean(getInput('edit-pr-comment'))
  })
}
