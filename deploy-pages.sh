#!/bin/bash

git add ./reports
git add ./docs
git add ./README.md

git commit -m 'Updated docs/reports'
git push origin master

rm -rf ~/mappedJS
mkdir ~/mappedJS
cp -R ./reports ~/mappedJS/reports
cp -R ./docs ~/mappedJS/docs
cp -R ./README.md ~/mappedJS/README.md

git checkout gh-pages

rm -rf reports
rm -rf docs

cp -R ~/mappedJS/reports ./
cp -R ~/mappedJS/docs ./
cp -R ./mappedJS/README.md ./

rm -rf ~/mappedJS

git add ./reports
git add ./docs
git add ./README.md

git commit -m 'Updated gh-pages docs and reports'
git push origin gh-pages

git checkout master
