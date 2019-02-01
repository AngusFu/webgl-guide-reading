set -e

rm -rf ./node_modules/@vuepress/core/.temp/
rm -rf ./node_modules/@vuepress/core/node_modules/.cache
npm start
