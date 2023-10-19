import * as core from '@actions/core'
import { run } from './run'

const main = async (): Promise<void> => {
  await run({
    number: parseInt(core.getInput('number', { required: true })),
    githubToken: core.getInput('github_token', { required: true }),
  })
}

main().catch((e) => core.setFailed(e instanceof Error ? e.message : JSON.stringify(e)))
