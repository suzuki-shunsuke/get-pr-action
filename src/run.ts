import * as core from '@actions/core';
import * as github from '@actions/github';

type Inputs = {
  number: number
  timeout: number
  interval: number
  githubToken: string
}

export const run = async (inputs: Inputs): Promise<void> => {
  core.info('Getting a pull request');
  const context = github.context;
  const octokit = github.getOctokit(inputs.githubToken);
  for (let time = 0; time < inputs.timeout; time+=inputs.interval) {
    const { data: pullRequest } = await octokit.rest.pulls.get({
      ...context.repo,
      pull_number: inputs.number,
    });
    if (pullRequest.mergeable !== null) {
      core.setOutput('pull_request', JSON.stringify(pullRequest));
      if (pullRequest.mergeable) {
        core.setOutput('merge_commit_sha', JSON.stringify(pullRequest.merge_commit_sha));
      }
      return
    }
    core.info('mergeable is still null. Retrying ...');
    await sleep(inputs.interval * 1000);
    core.setOutput('pull_request', JSON.stringify(pullRequest));
  }
  core.warning('timeout');
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
