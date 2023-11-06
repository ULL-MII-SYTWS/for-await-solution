#!/bin/bash
# GitHub CLI api
# https://cli.github.com/manual/gh_api
OWNER=torvalds
REPO=linux
if [ -z "$1" ]; then
  echo "No owner provided, using defaults owner: ${OWNER} repo: ${REPO}"
else
  OWNER=$1
  if [ -z "$2" ]; then
    echo "No repo provided, using default: linux"
  else
    REPO=$2
  fi
fi
# Option --verbose Includes full HTTP request and response in the output
# Option --silent does not print the response body
gh api \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  /repos/${OWNER}/${REPO}/commits \
  --include --silent

