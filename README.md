# get-pr-action

Get the current pull request information by GitHub API.
This action waits until the pull request `mergeable` gets non `null`.

## Motivation

We created this action to checkout the repository with the merge commit in workflows triggered by `pull_request_target`.
The value `${{github.event.pull_request.merge_commit_sha}}` of `pull_request_target` is stale, so you need to get the correct value by GitHub API.
Until the merge commit is created at GitHub, the pull request's `mergeable` is `null` and `merge_commit_sha` is incorrect, so this action calls API until the pull request's `mergeable` gets non `null`.

## Usage

All inputs are optional. You can get the result from the output.

```yaml
- uses: suzuki-shunsuke/get-pr-action
  id: pr
- run: echo "$CREATED_AT"
  env:
    CREATED_AT: ${{fromJSON(steps.pr.outputs.pull_request).created_at}}
- run: echo "$CREATED_AT"
  env:
    MERGE_COMMIT_SHA: ${{steps.pr.outputs.merge_commit_sha}}
```

You can also specify some inputs.

```yaml
- uses: suzuki-shunsuke/get-pr-action
  with:
    github_token: ${{secrets.PAT}}
    number: 10
    timeout: 30
    interval: 1
```

## Inputs

- `github_token`: GitHub Access token to get a pull request. The default value is `${{github.token}}`
- `number`: Pull Request number. The default value is `${{github.event.number}}`
- `timeout`: timeout. The default value is `60` seconds
- `interval`: interval. The default value is `5` seconds

## Outputs

- `pull_request`: The payload of [Get a Pull Request API](https://docs.github.com/en/free-pro-team@latest/rest/pulls/pulls?apiVersion=2022-11-28#get-a-pull-request)
- `merge_commit_sha` The commit hash of the merge commit. If timeout occurs or the pull request isn't mergeable, this output is empty

## LICENSE

[MIT](LICENSE)
