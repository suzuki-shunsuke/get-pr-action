# get-pr-action

Get the current pull request information by GitHub API.
This action waits until the pull request `mergeable` gets non `null`.

## Usage

```yaml
# All inputs are optional
- uses: suzuki-shunsuke/get-pr-action
  id: pr
- run: echo "$CREATED_AT"
  env:
    CREATED_AT: ${{fromJSON(steps.pr.outputs.pull_request).created_at}}
- run: echo "$CREATED_AT"
  env:
    MERGE_COMMIT_SHA: ${{steps.pr.outputs.merge_commit_sha}}
```

```yaml
uses: suzuki-shunsuke/get-pr-action
with:
  github_token: ${{secrets.PAT}}
  number: 10
```

## Inputs

- `github_token`: GitHub Access token to get a pull request. The default value is `${{github.token}}`
- `number`: Pull Request number. The default value is `${{github.event.number}}`
- `timeout`: timeout. The default value is `60` seconds
- `interval`: interval. The default value is `5` seconds

## LICENSE

[MIT](LICENSE)
