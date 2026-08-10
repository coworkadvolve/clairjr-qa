#!/usr/bin/env bash
# Run this from your own Mac Terminal (NOT inside Cowork's sandbox),
# in the project folder: clairjr-nextjs-cms-main-v3.8/clairjr-main
#
# Creates/updates a "qa" branch with your current local project state
# and pushes it to GitHub so Dokploy can deploy it to qa.clairjg.com.

set -e

echo "== Cleaning up any stray .git state =="
rm -rf .git

echo "== Initializing git =="
git init -q
git remote add origin https://github.com/coworkadvolve/clairjr.git

echo "== Fetching existing history =="
git fetch origin

echo "== Creating qa branch from origin/main (no working files touched) =="
git update-ref refs/heads/qa origin/main
git symbolic-ref HEAD refs/heads/qa
git reset origin/main

echo "== Review what will change (check this before committing!) =="
git status

read -p "Proceed with staging + commit? [y/N] " ok
if [[ "$ok" != "y" && "$ok" != "Y" ]]; then
  echo "Stopped. Nothing committed."
  exit 0
fi

git add -A
git commit -m "QA deploy: sync latest project state"

echo "== Pushing qa branch to GitHub =="
git push -u origin qa

echo "== Done. Confirm Dokploy is set to deploy from the 'qa' branch for qa.clairjg.com =="
