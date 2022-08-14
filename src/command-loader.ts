import { GlobSync } from "glob";
import * as path from "path";

export class CommandLoader {
  static load(): void {
    new GlobSync(
      path.join(__dirname, "entrypoints", "**", "*.ts")
    ).found.forEach((file: string) => {
      const collection: { [key: string]: Function } = require(file);
      Object.keys(collection).forEach((key) => {
        const fn = collection[key];
        if (typeof fn == "function" && !fn.length) {
          console.log(` ${key}`);
          fn();
        } else {
          console.warn(`${key} is not a function or it has arguments`);
        }
      });
    });
  }
}
