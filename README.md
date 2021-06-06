# Jest Coverage Commenter

[![build-test](https://github.com/grahamplata/jest-action-commenter/actions/workflows/test.yml/badge.svg)](https://github.com/grahamplata/jest-action-commenter/actions/workflows/test.yml)

- [Jest Coverage Commenter](#jest-coverage-commenter)
  - [Getting Started](#getting-started)
  - [Configuration](#configuration)
    - [Required](#required)
    - [Optional](#optional)

## Getting Started

```yaml
name: Jest Coverage Commenter
on:
  push:
    branches:
      - master
jobs:
  coverage:
    name: Jest Coverage Comment
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Comment Coverage on Pull Request
        uses: grahamplata/jest-action-commenter@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          test-command: npx jest --coverage
          work-dir: ./service
```

## Configuration

The action can be configured with the following `with:` arguments:

### Required

- `github-token` - (required) A GitHub token that has access levels to allow the
  Action to comment on a PR. Defaults to `${{ github.token }}` or as an `env`

### Optional

- `test-command` (optional) - The command to run as part of the action. Defaults to `npx jest --coverage`
-
- `work-dir` (optional) - The directory to execure the test-command from. Defaults to `./`
