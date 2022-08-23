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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onAppHomeOpened = void 0;
const app_1 = require("../../app");
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale("ja");
const VIEWID = "view_1";
const onAppHomeOpened = () => {
    app_1.app.command("/use_calculator", ({ ack, body, client, logger, }) => __awaiter(void 0, void 0, void 0, function* () {
        // コマンドのリクエストを確認
        yield ack();
        try {
            const result = yield client.views.open({
                // 適切な trigger_id を受け取ってから 3 秒以内に渡す
                trigger_id: body.trigger_id,
                // view の値をペイロードに含む
                view: {
                    type: "modal",
                    // callback_id が view を特定するための識別子
                    callback_id: VIEWID,
                    title: {
                        type: "plain_text",
                        text: "計算機サーバー利用予約",
                    },
                    blocks: [
                        {
                            type: "input",
                            block_id: "start_date",
                            label: {
                                type: "plain_text",
                                text: "開始日",
                            },
                            element: {
                                type: "datepicker",
                                action_id: "date_input",
                            },
                        },
                        {
                            type: "section",
                            block_id: "start_time",
                            text: {
                                type: "mrkdwn",
                                text: "開始時刻",
                            },
                            accessory: {
                                type: "timepicker",
                                action_id: "time_input",
                                initial_time: "11:40",
                                placeholder: {
                                    type: "plain_text",
                                    text: "Select a time",
                                },
                            },
                        },
                        {
                            type: "input",
                            block_id: "end_date",
                            label: {
                                type: "plain_text",
                                text: "終了日",
                            },
                            element: {
                                type: "datepicker",
                                action_id: "date_input",
                            },
                        },
                        {
                            type: "section",
                            block_id: "end_time",
                            text: {
                                type: "mrkdwn",
                                text: "終了時刻",
                            },
                            accessory: {
                                type: "timepicker",
                                action_id: "time_input",
                                initial_time: "11:40",
                                placeholder: {
                                    type: "plain_text",
                                    text: "Select a time",
                                },
                            },
                        },
                    ],
                    submit: {
                        type: "plain_text",
                        text: "Submit",
                    },
                },
            });
            logger.info(result);
        }
        catch (error) {
            logger.error(error);
        }
    }));
    app_1.app.view(VIEWID, ({ ack, view, context, body, client, logger, }) => __awaiter(void 0, void 0, void 0, function* () {
        yield ack();
        try {
            const user = body.user.id;
            const start_date = view.state.values.start_date.date_input.selected_date;
            const start_time = view.state.values.start_time.time_input.selected_time;
            const end_date = view.state.values.end_date.date_input.selected_date;
            const end_time = view.state.values.end_time.time_input.selected_time;
            const start = (0, moment_1.default)(start_date + " " + start_time).format("YYYY年MM月DD日hh時mm分");
            const end = (0, moment_1.default)(end_date + " " + end_time).format("YYYY年MM月DD日hh時mm分");
            yield client.chat.postMessage({
                channel: user,
                text: `${start}から${end}で予約しました`,
            });
        }
        catch (error) {
            logger.error(error);
        }
    }));
};
exports.onAppHomeOpened = onAppHomeOpened;
