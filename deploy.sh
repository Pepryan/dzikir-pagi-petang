#!/bin/bash

# Build the app
echo "Building the app..."
npm run build

# Create or update .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
  echo "Creating .gitignore..."
  echo "node_modules/" > .gitignore
  echo "dist/" >> .gitignore
  echo ".DS_Store" >> .gitignore
fi

# Create a temporary directory for deployment
echo "Creating temporary directory for deployment..."
mkdir -p tmp_deploy

# Copy the built files to the temporary directory
echo "Copying built files..."
cp -r dist/* tmp_deploy/

# Create a .nojekyll file to bypass Jekyll processing
echo "Creating .nojekyll file..."
touch tmp_deploy/.nojekyll

# Switch to gh-pages branch or create it if it doesn't exist
echo "Switching to gh-pages branch..."
git checkout gh-pages 2>/dev/null || git checkout -b gh-pages

# Remove existing files (except .git and tmp_deploy)
echo "Cleaning gh-pages branch..."
find . -maxdepth 1 ! -name '.git' ! -name 'tmp_deploy' ! -name '.' -exec rm -rf {} \;

# Copy the built files from the temporary directory
echo "Moving built files to root..."
cp -r tmp_deploy/* .
cp tmp_deploy/.nojekyll .

# Remove the temporary directory
echo "Cleaning up..."
rm -rf tmp_deploy

# Add all files to git
echo "Adding files to git..."
git add .

# Commit the changes
echo "Committing changes..."
git commit -m "Deploy to GitHub Pages"

# Push to GitHub
echo "Pushing to GitHub..."
git push origin gh-pages

# Switch back to the main branch
echo "Switching back to main branch..."
git checkout main

echo "Deployment complete! Your app should be available at https://pepryan.github.io/dzikir-pagi-petang/"
