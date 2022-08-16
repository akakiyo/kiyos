import { firestore } from "../../firebase";
import { app } from "../../app";

export const setData = async (): Promise<void> => {
  app.command("/set", async ({ body, payload, context, client, ack }) => {
    await ack();

    try {
      const collection = firestore.collection(`kiyos-app`);
      const text: any = { message: payload.text };
      //firestoreにデータ登録
      await collection.doc(payload.user_id).set({ text });

      //成功をSlack通知
      const msg = {
        token: context.botToken,
        text: "メッセージを登録しました",
        channel: payload.channel_id,
      };
      await client.chat.postMessage(msg);
    } catch (err) {
      console.warn(err);
    }
  });
};
