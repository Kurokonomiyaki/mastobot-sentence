import Fs from 'fs';
import { randomPick } from './util';

export const loadModel = (file) => {
  const model = JSON.parse(Fs.readFileSync(file).toString());
  return model;
};

export const generateSentence = (model) => {
  const sentence = randomPick(model.strings);
  return sentence.replace(/\${(.+?)}/g, (matched) => {
    const variableName = matched.substring(2, matched.length - 1);
    const collection = model.collections[variableName];
    return randomPick(collection);
  });
};
