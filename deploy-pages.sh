rm -rf ~/mappedJS
mkdir ~/mappedJS
cp -R ./reports ~/mappedJS/reports
cp -R ./docs ~/mappedJS/docs

git checkout gh-pages

rm -rf reports
rm -rf docs

cp -R ~/mappedJS/reports ./
cp -R ~/mappedJS/docs ./

rm -rf ~/mappedJS

git commit -m 'Updated gh-pages docs and reports'
git push origin gh-pages

git checkout master
