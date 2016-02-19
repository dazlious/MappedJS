mkdir -p built
cp -r /Applications/nwjs.app/ built/MappedJS\ Creator.app
rm -rf built/MappedJS\ Creator.app/Contents/Resources/app.nw
mkdir -p built/MappedJS\ Creator.app/Contents/Resources/app.nw
cp -r content/ built/MappedJS\ Creator.app/Contents/Resources/app.nw/content
cp package.json built/MappedJS\ Creator.app/Contents/Resources/app.nw/package.json
echo "Built into [./built/MappedJS Creator.app]"
