import { getInput } from '@actions/core'
import * as rt from 'runtypes'
import { parseBoolean } from './libs/utils'

// config
export const config = rt.Record({
  // Options
  command: rt.String,
  workDir: rt.String,
  githubToken: rt.String,
  changedSinceMaster: rt.Boolean,
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
    changedSinceMaster: parseBoolean(getInput('changed-since-master')),
    editCommentOnPr: parseBoolean(getInput('edit-pr-comment'))
  })
}
