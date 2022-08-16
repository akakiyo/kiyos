import { app } from "../../app";
import moment from "moment";
moment.locale("ja");
const VIEWID: string = "view_1";

export const onAppHomeOpened = () => {
  app.command(
    "/use_calculator",
    async ({
      ack,
      body,
      client,
      logger,
    }: {
      ack: any;
      body: any;
      client: any;
      logger: any;
    }) => {
      // コマンドのリクエストを確認
      await ack();

      try {
        const result = await client.views.open({
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
      } catch (error) {
        logger.error(error);
      }
    }
  );
  app.view(
    VIEWID,
    async ({
      ack,
      view,
      context,
      body,
      client,
      logger,
    }: {
      ack: any;
      view: any;
      context: any;
      body: any;
      client: any;
      logger: any;
    }) => {
      await ack();
      try {
        const user = body.user.id;
        const start_date =
          view.state.values.start_date.date_input.selected_date;
        const start_time =
          view.state.values.start_time.time_input.selected_time;
        const end_date = view.state.values.end_date.date_input.selected_date;
        const end_time = view.state.values.end_time.time_input.selected_time;

        const start = moment(start_date + " " + start_time).format(
          "YYYY年MM月DD日hh時mm分"
        );
        const end = moment(end_date + " " + end_time).format(
          "YYYY年MM月DD日hh時mm分"
        );
        await client.chat.postMessage({
          channel: user,
          text: `${start}から${end}で予約しました`,
        });
      } catch (error) {
        logger.error(error);
      }
    }
  );
};
