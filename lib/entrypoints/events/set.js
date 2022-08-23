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
exports.setData = void 0;
const firebase_1 = require("../../firebase");
const app_1 = require("../../app");
const setData = () => __awaiter(void 0, void 0, void 0, function* () {
    app_1.app.command("/set", ({ body, payload, context, client, ack }) => __awaiter(void 0, void 0, void 0, function* () {
        yield ack();
        try {
            const collection = firebase_1.firestore.collection(`kiyos-app`);
            const text = { message: payload.text };
            //firestoreにデータ登録
            yield collection.doc(payload.user_id).set({ text });
            //成功をSlack通知
            const msg = {
                token: context.botToken,
                text: "メッセージを登録しました",
                channel: payload.channel_id,
            };
            yield client.chat.postMessage(msg);
        }
        catch (err) {
            console.warn(err);
        }
    }));
});
exports.setData = setData;
