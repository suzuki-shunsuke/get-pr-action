import * as core from '@actions/core';
import * as github from '@actions/github';

type Inputs = {
  number: number
  githubToken: string
}

export const run = async (inputs: Inputs): Promise<void> => {
  core.info('Getting a pull request');
  const context = github.context;
  const octokit = github.getOctokit(inputs.githubToken);
  const { data: pullRequest } = await octokit.rest.pulls.get({
    ...context.repo,
    pull_number: inputs.number,
  });
  core.setOutput('pull_request', JSON.stringify(pullRequest));
  core.setOutput('merge_commit_sha', JSON.stringify(pullRequest.merge_commit_sha));
}
