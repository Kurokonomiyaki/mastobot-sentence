import Mastodon from 'mastodon-api';
import Fs from 'fs';

import { getSettings } from './settings';
import { loadModel, generateSentence } from './sentencemodel';
import { listPictures } from './picture';
import { randomPick } from './util';

const sendToot = async ({ accessToken, instanceUrl, tootOptions }, sentenceModel, pictures) => {
  const instance = new Mastodon({
    access_token: accessToken,
    api_url: instanceUrl,
  });

  const text = generateSentence(sentenceModel);
  const toot = Object.assign(tootOptions, {
    status: text,
  });

  if (pictures != null) {
    const picture = randomPick(pictures);

    // upload the picture
    const response = await instance.post('media', {
      file: Fs.createReadStream(picture),
    });
    if (response.data == null || response.data.id == null) {
      console.warn('Error while uploading image', response.data || response, picture);
      return;
    }

    const mediaId = response.data.id;
    toot.media_ids = [ mediaId ];
  }

  // send the toot
  return instance.post('statuses', toot);
};

export const startBot = () => {
  const settings = getSettings(`${__dirname}/../settings.json`);
  const sentenceModel = loadModel(`${__dirname}/../${settings.dataFile}`);

  let pictures = null;
  if (settings.illustrationFolder != null) {
    pictures = listPictures(`${__dirname}/../${settings.illustrationFolder}`);
  }

  sendToot(settings, sentenceModel, pictures)
    .then(r => console.log('Published: ', r.data.content))
    .catch(e => console.log('Error: ', e));

  setInterval(() => {
    sendToot(settings, sentenceModel)
      .then(r => console.log('Published: ', r.data.content))
      .catch(e => console.log('Error: ', e));
  }, settings.timeBetweenToots * 60000);
};

export default startBot;

