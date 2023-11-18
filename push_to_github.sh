#!/bin/bash

# Source the environment file
source /Users/alejandropina/Downloads/.env


# Pull the latest changes from GitHub
git pull

# Add all new and changed files to the staging area
git add .

# Commit the changes
git commit -m "Update website"

# Push the changes to GitHub
git push origin main

