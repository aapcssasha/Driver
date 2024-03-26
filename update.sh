#!/bin/bash
git add .
git commit -m "update"
ssh-add ~/.ssh/id_rsa_new
git push origin main
