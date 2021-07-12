/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const defaultConfig: Record<string, string> = {
  'test-command': 'npm run test --coverage',
  'work-dir': './',
  'github-token': 'n/a',
  'changed-since-master': 'false',
  'edit-pr-comment': 'false'
}

describe('config.ts', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('should validate a configuration', async () => {
    const config: Record<string, string> = {
      ...defaultConfig,
      'edit-pr-comment': 'true'
    }

    jest.mock('@actions/core', () => ({
      getInput: jest.fn((name: string) => {
        return config[name]
      })
    }))

    const { makeConfig } = require('../config')

    const c = await makeConfig()
    expect(c).toBeTruthy()
    expect(c).toMatchInlineSnapshot(`
Object {
  "changedSinceMaster": false,
  "command": "npm run test --coverage",
  "editCommentOnPr": true,
  "githubToken": "n/a",
  "workDir": "./",
}
`)
  })

  it('should fail if configuration are invalid', async () => {
    const config: Record<string, string> = {
      command: 'sideways'
    }
    jest.mock('@actions/core', () => ({
      getInput: jest.fn((name: string) => {
        return config[name]
      })
    }))

    const { makeConfig } = require('../config')

    await expect(makeConfig()).rejects.toThrow()
  })
  it('should validate a configuration with commentOnPr eq true', async () => {
    const config: Record<string, string> = {
      ...defaultConfig,
      'comment-on-pr': 'true'
    }
    jest.mock('@actions/core', () => ({
      getInput: jest.fn((name: string) => {
        return config[name]
      })
    }))

    const { makeConfig } = require('../config')

    const c = await makeConfig()
    expect(c).toBeTruthy()
    expect(c).toMatchInlineSnapshot(`
Object {
  "changedSinceMaster": false,
  "command": "npm run test --coverage",
  "editCommentOnPr": false,
  "githubToken": "n/a",
  "workDir": "./",
}
`)
  })
})
