import { app } from "./app";
import { CommandLoader } from "./command-loader";

(async (): Promise<void> => {
  await app.start(process.env.PORT || 3000);
  CommandLoader.load();
  console.log("⚡️ Bolt app is running!");
})();
