#!/bin/bash

# Set PATH to include the directory of Git and standard directories
export PATH=/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin

# Start the SSH agent and add your SSH key (assuming no passphrase)
eval "$(ssh-agent -s)"
ssh-add --apple-use-keychain ~/.ssh/id_rsa_github

# Navigate to your local repository
cd /Users/alejandropina/Downloads/DriverWebsite

# Pull the latest changes from GitHub
git pull

# Check for changes. If none, exit the script.
if [ -z "$(git status --porcelain)" ]; then
  echo "No changes to commit."
  exit 0
fi

# Add all new and changed files to the staging area
git add .

# Commit the changes
git commit -m "Automated update from cron job"

# Push the changes to GitHub
git push origin main
