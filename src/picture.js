import Fs from 'fs';
import Path from 'path';

const EXTENSION_REGEX = /\.(jpeg|jpg|png)$/;

export const listPictures = (folder) => {
  let files = Fs.readdirSync(folder);
  files = files.filter(file => EXTENSION_REGEX.test(file));
  return files.map(file => Path.join(folder, file));
};
