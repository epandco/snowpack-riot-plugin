const { compile } = require('@riotjs/compiler');
const fs = require('fs').promises;
const {join} = require('path');

module.exports = function (snowpackConfig, pluginOptions) {
  return {
    name: 'snowpack-riot-plugin',
    resolve: {
      input: ['.riot'],
      output: ['.js']
    },
    async load({filePath}) {
      const file = (await fs.readFile(filePath)).toString();
      const {code, map} = compile(file, {
        scopedCss: true,
        comments: false
      });
      return code;
    }
  };
};
