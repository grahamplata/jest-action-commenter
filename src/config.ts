import { getInput } from '@actions/core'
import * as rt from 'runtypes'

// config
export const config = rt.Record({
  // Options
  command: rt.String,
  workDir: rt.String,
  githubToken: rt.String
})

// Config
export type Config = rt.Static<typeof config>

// makeConfig
export async function makeConfig(): Promise<Config> {
  return config.check({
    githubToken: getInput('github-token', { required: true }),
    command: getInput('test-command', { required: true }),
    workDir: getInput('work-dir') || './'
  })
}
