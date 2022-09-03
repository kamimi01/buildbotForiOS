import axios from "axios";

/**
 * Appsの情報のAPIクライアント
 * @param {string} token - JWTトークン
 * @returns {AxiosInstance} - axiosの何か
 */
export const appStoreConnectApiClient = (token: string) => axios.create({
    baseURL: `https://api.appstoreconnect.apple.com/v1/apps/${process.env.APP_ID}`,
    responseType: "json",
    headers: {
        "Authorization": token
    }
});