import Mock, { Random } from "mockjs";
import type { MockMethod } from "vite-plugin-mock";
export default [
    {
        url: "/api/getCurrentUser", // 获取登陆用户信息
        method: "get",
        timeout: 1000,
        response: () => {
            return {
                code: 200,
                message: "",
                data: {
                    userName: Mock.mock('@name'),
                    email: Random.email(),
                },
            };
        },
    },

] as MockMethod[];

