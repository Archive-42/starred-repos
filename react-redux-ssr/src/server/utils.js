const fs = require('fs');

const IS_PROD = process.env.NODE_ENV === 'production';

const getBundleChunkNameByHack = (dir, filePrefix, fallback) => {
  const list = fs.readdirSync(dir);
  const output = (list || []).filter(x => x.indexOf(filePrefix) > -1);
  return output.length > 0 ? output[0] : fallback;
};

module.exports = {
  IS_PROD,
  getBundleChunkNameByHack,
};
