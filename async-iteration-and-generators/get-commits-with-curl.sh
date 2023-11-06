#!/bin/bash
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
# --head: fetch the headers only
curl --head \
-H "Accept: application/vnd.github+json" \
-H "Authorization: Bearer $GITHUB_TOKEN" \
-H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/${OWNER}/${REPO}/commits