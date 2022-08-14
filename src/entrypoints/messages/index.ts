import { app } from "../../app";

export const Hello = async (): Promise<void> => {
  app.message("hello", async ({ message, say }) => {
    console.log(message);
    await say(`Hey there <@${message}>!`);
  });
};
