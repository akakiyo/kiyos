import { App, ExpressReceiver } from "@slack/bolt";
require("dotenv").config();

const config = {
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET as string,
};

export const app = new App(config);
