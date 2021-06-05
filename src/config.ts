import { getInput } from '@actions/core'
import * as rt from 'runtypes'

// config
export const config = rt
  .Record({
    // Required options
    command: rt.String,
    workDir: rt.String
  })
  .And(
    rt.Partial({
      // Optional options
      githubToken: rt.String
    })
  )

// Config
export type Config = rt.Static<typeof config>

// makeConfig
export async function makeConfig(): Promise<Config> {
  return config.check({
    command: getInput('command', { required: true }),
    workDir: getInput('work-dir') || './',
    githubToken: getInput('github-token')
  })
}
