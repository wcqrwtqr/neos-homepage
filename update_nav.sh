#!/bin/bash

# Load the updated <nav> content from index.html into a variable
nav_content=$(awk '/<nav/,/<\/nav>/' index.html)

# Check if <nav> content was found
if [ -z "$nav_content" ]; then
  echo "No <nav> tag found in index.html"
  exit 1
fi

# Escape forward slashes for use in sed
escaped_nav_content=$(echo "$nav_content" | sed 's/\//\\\//g')

# Process each .html file in the current directory
for file in *.html; do
  # Check if the file is not index.html
  if [[ "$file" != "index.html" ]]; then
    # Replace existing <nav> content with the new <nav> content
    sed -i.bak -E "/<nav/,/<\/nav>/c\\
$escaped_nav_content
" "$file" && echo "Updated <nav> in $file"
  fi
done

echo "All <nav> tags updated successfully."
