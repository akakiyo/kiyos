"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const bolt_1 = require("@slack/bolt");
require("dotenv").config();
const config = {
    token: process.env.SLACK_BOT_TOKEN,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
};
exports.app = new bolt_1.App(config);
