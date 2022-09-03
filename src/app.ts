import { App } from "@slack/bolt";
import { getAppInfo } from "./functions";

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    port: parseInt(process.env.PORT) || 3000
});

app.command("/buildbot", async ({ command, ack, respond }) => {
    // コマンドリクエストを確認
    await ack();

    const info = await getAppInfo();

    const appInfo = {
        appName: "",
        appVersion: "バージョン",
        buildNumber: "unixtime",
        bundleId: "",
        teamId: "team"
    };

    await respond({
        blocks: [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": ":hammer: 以下のアプリ情報でビルドします ",
                    "emoji": true
                }
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "plain_text",
                        "text": "アプリ名",
                        "emoji": true
                    },
                    {
                        "type": "plain_text",
                        "text": appInfo.appName,
                        "emoji": true
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "plain_text",
                        "text": "アプリバージョン",
                        "emoji": true
                    },
                    {
                        "type": "plain_text",
                        "text": appInfo.appVersion,
                        "emoji": true
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "plain_text",
                        "text": "ビルド番号",
                        "emoji": true
                    },
                    {
                        "type": "plain_text",
                        "text": appInfo.buildNumber,
                        "emoji": true
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "plain_text",
                        "text": "Bundle ID",
                        "emoji": true
                    },
                    {
                        "type": "plain_text",
                        "text": appInfo.bundleId,
                        "emoji": true
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "plain_text",
                        "text": "Team ID",
                        "emoji": true
                    },
                    {
                        "type": "plain_text",
                        "text": appInfo.teamId,
                        "emoji": true
                    }
                ]
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": " "
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "実行",
                        "emoji": true
                    },
                    "action_id": "build-action"
                }
            }
        ]
    });
});

app.action("build-action", async ({ body, ack, say }) => {
    await ack();
    await say(`:apple: <@${body.user.id}>がビルド中です\nアプリ名：アプリ名\nアプリバージョン：バージョン\nビルド番号：番号\nBundle ID：ID\nTeam ID：ID`);
});

(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);

    console.log("⚡️ Bolt app is running!");
})();