const path = require('path');
const util = require('util');
const fs = require('fs');

module.exports = {
  mode: 'development',
  entry: () => buildEntry(),
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: [{loader: 'ts-loader', options: { configFile: 'tsconfig.chrome.json' }}],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist-chrome'),
  },
};

async function buildEntry() {
  const chromePath = path.join(__dirname, 'chrome');
  /* if need more entry, make [contentsPath] below into loop */
  const contentsPath = path.join(chromePath, 'contents');
  const contentFiles = fs.readdirSync(contentsPath).map(p => path.join(chromePath, 'contents', p));
  const backgroundPath = path.join(chromePath, 'background.ts');
  const filePathList = [...contentFiles, backgroundPath]
  const fileEntry = {};
  filePathList.forEach(_path => {
    const extension = path.extname(_path);
    const relativePath = path.relative(chromePath, _path);
    const filePath = relativePath.replace(extension, '');
    fileEntry[filePath] = _path;
  });
  return fileEntry;
}
