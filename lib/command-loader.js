"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLoader = void 0;
const glob_1 = require("glob");
const path = __importStar(require("path"));
class CommandLoader {
    static load() {
        new glob_1.GlobSync(path.join(__dirname, "entrypoints", "**", "*.*")).found.forEach((file) => {
            const collection = require(file);
            Object.keys(collection).forEach((key) => {
                const fn = collection[key];
                if (typeof fn == "function" && !fn.length) {
                    console.log(` ${key}`);
                    fn();
                }
                else {
                    console.warn(`${key} is not a function or it has arguments`);
                }
            });
        });
    }
}
exports.CommandLoader = CommandLoader;
