### What is it?

A simple sentence generator bot that publish toots regularly.

### How to deploy on your server

0. Install node: https://nodejs.org/en/download/package-manager

1. Clone the repository and install production dependencies using npm

    ```bash
    git clone https://github.com/Kurokonomiyaki/mastobot-sentence.git
    cd mastobot-sentence
    npm install --production
    ```

2. Get a token for your bot

    Run the script and then follow the instructions:
    ```bash
    npm run token
    ```

3. Configure the bot

    Copy the `edit-these-settings.json` file into `settings.json`.

    ```bash
    cp edit-these-settings.json settings.json
    ```

    Edit `settings.json` and set the instance url and access token.

    The bot sentences are stored in a JSON file (see `dataFile` in `settings.json`). An example of sentence model can be seen in `model/example.json`.

4. Run the bot

    You can run the bot directly using `node`.

    ```bash
    node compiled/index.js
    ```

    You should create a service for the bot. You can use `mastobot-sentence.service` as a template for a systemd service.
    Read [this documentation](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/system_administrators_guide/sect-managing_services_with_systemd-unit_files) about systemd service files.

### How to define a Content Warning
Add a `spoiler_text` field to the `tootOptions` in the `settings.json` file. This object is actually merged with all sent request and any [official API](https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#posting-a-new-status) field can be set there.
