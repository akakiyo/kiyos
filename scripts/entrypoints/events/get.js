"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const app_1 = require("../../app");
const firebase_1 = require("../../firebase");
const getData = () => {
    app_1.app.command(`/get`, ({ payload, ack, context, client }) => __awaiter(void 0, void 0, void 0, function* () {
        yield ack();
        try {
            // firestoreのデータを取得
            const collection = firebase_1.firestore.collection(`kiyos-app`);
            const res = yield collection.doc(payload.user_id).get();
            console.log(res);
            // Slack通知
            const msg = {
                token: context.botToken,
                text: "test",
                channel: payload.channel_id,
            };
            client.chat.postMessage(msg);
        }
        catch (err) {
            console.warn(err);
        }
    }));
};
exports.getData = getData;
