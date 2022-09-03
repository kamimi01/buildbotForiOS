import { appStoreConnectApiClient } from "./lib/apiClient";
import { AppInfoResponse } from "./types/AppInfo";

/**
 * JWTトークンの取得
 * @returns {string} - JWTトークン
 */
export const getJWTOfAppStoreConnect = () => {
    console.log("テスト");
    return "JWTトークン"
};

/**
 * アプリ情報の取得
 * @returns {AppInfoResponse} - アプリ情報
 */
export const getAppInfo = async () => {
    const token = getJWTOfAppStoreConnect();
    // console.log(token)
    let appInfoResponse: AppInfoResponse;

    await appStoreConnectApiClient(token)
    .get<AppInfoResponse>("", {})
    .then((response) => {
        const data = response.data;
        console.log("テスト！！：", data);
        appInfoResponse = {
            id: data.id,
            name: data.name,
            bundleId: data.bundleId,
        };
        console.log("appInfoResponse2:", appInfoResponse);
    });

    console.log(appInfoResponse);
    return appInfoResponse;
};