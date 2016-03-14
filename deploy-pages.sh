#!/bin/bash

git checkout gh-pages
git checkout master docs/ reports/ test/ plugin/dist/ plugin/examples/
git commit -m "'Merge' docs, reports and examples from 'master' branch"
git push origin
git checkout master
