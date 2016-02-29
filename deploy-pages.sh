#!/bin/bash

git checkout gh-pages
git checkout master docs/ reports/ test/
git commit -m "'Merge' docs and reports from 'master' branch"
git push origin
git checkout master
