import { defineStore } from 'pinia';
import type { UserInfoType } from './types';
import request from "@/api/request";

const useUserStore = defineStore('useUserStore', {
    persist: {
        enabled: true,
        H5Storage: window?.localStorage,
    },
    state: (): {
        token: string,
        /** 登陆状态 0 未登录 1 已登录  */
        loginStatus: number,
        userInfo: UserInfoType,
        matchmakerInfo: UserInfoType,
        role: number
    } => ({
        userInfo: {} as UserInfoType,
        matchmakerInfo: {} as UserInfoType,
        role: -1,
        token: '',
        loginStatus: 0
    }),
    getters: {

    },
    actions: {
        async checkToken() {
            return new Promise((resolve, reject) => {
                request.get<any>('user/isTokenValid', null).then((res) => {
                    this.token = res.data.token;
                    resolve(true);
                }).catch(() => {
                    this.logout();
                    reject(false);
                });
            });
        },
        async login(phone: string, passwordHash: string) {
            try {
                let res = await request.post<any>('user/login', {
                    phone,
                    passwordHash
                });
                this.token = res.data.token;
                this.loginStatus = 1;
                await this.getUserInfo();
                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        },
        async getUserInfo() {
            try {
                let res = await request.post<UserInfoType>('user/userInfo', null);
                this.userInfo = res.data;
                this.role = res.data.role;
            } catch (e) {
                console.log(e);
            }
        },
        logout() {
            this.loginStatus = 0;
            this.role = -1;
            this.userInfo = {} as UserInfoType;
            this.token = '';
        },
        async deleteUser(){
            const res = await request.post("member/applyDeleteUser",null);
            console.log(res);
        }
    },
});

export default useUserStore;
