git reset HEAD~1
git add .
git commit -m "deploy"
git push --force
bundle exec cap production deploy
