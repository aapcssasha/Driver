#!/bin/bash

# Source the environment file
source /Users/alejandropina/Downloads/.env

# Navigate to your repository directory
cd /Users/alejandropina/Downloads/DriverWebsite

# Add all changed files to the commit
git add .

# Commit the changes with a message
git commit -m "Daily update"

# Push the changes to GitHub, using the PAT from the .env file
git push https://x-access-token:$GITHUB_PAT@github.com/aapcssasha/Driver.git main

