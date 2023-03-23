import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import Vue from 'vue'
import _ from "lodash"
import { Core } from '@/vuexes/core'
import { Web } from '@/vuexes/web'
import axios from '@/plugins/axios'

@Module({ generateMutationSetters: true })
class AuthModule extends VuexModule {
    /**
    * @point Base Variable สำหรับเก็บข้อมูล user ลงใน store
    */
    private token: any = localStorage.getItem('token')
    public user: any = null 

    /**
    * @point Custom Variable สำหรับเก็บข้อมูล user ลงใน store
    */ 
 

    /**
    * @point สำหรับรันเมื่อ login สำเร็จ และ สามารถโยนข้อมูล user เข้าไปใน method นี้ได้เลย
    */
    public async getThenLogin(user: any) {
   
    }

    /**
    * @point Base Function สำหรับเก็บข้อมูล user ลงใน store
    */
    public async setUser() {
        let user = await this.getUser();
        this.user = user
        return user
    }

    public async getUser() {
        try {
            let baseUser = await Core.getHttp(`/api/profile`)
            if (baseUser.id) { 
                this.user = baseUser
                await this.getThenLogin(baseUser)
                return baseUser
            }
            return null
        } catch (error) {
            return null
        }
    }
 
    public async login(form: any) {
        await this.reToken();
        let user = await Core.postHttp(`/api/login`, form)
        if (user.success) {
            await this.storeToken(user.data.token);
            await this.storeTokenToStorage(user.data.token);
            await this.setUser();
            await location.reload();
            return user
        } else {
            await Web.alertAuto(`Cannot Login`, 2000, `error`, `Username or Password is incorrect`)
        }
        return user
    }

    public async register(form: any) {
        await this.reToken();
        let user = await Core.postHttp(`/api/auth/v2/register/`, form)
        if(user.username){

        }
        return user
    }
 


    public async reToken() {
        axios.defaults.headers.common['Authorization'] = '';
    }

    public async storeToken(token: any) {
        // console.log("OK");
        axios.defaults.headers.common['Authorization'] = (token != null) ? `Bearer ${token}` : '';
    }

    public async storeTokenToStorage(token: any) {
        localStorage.setItem('token', token)
    }

    public async checkToken() {
        if (this.token != null) {
            await this.storeToken(this.token);
        }
    }
    public async checkUser() {
        if (this.token) {
            //  console.log(`TOKEN : ${this.token}`);
            await this.storeToken(this.token);
            let user = await this.getUser();
            if (!user) {
                // alert('Session หมดอายุ di')
                // await Web.alert(`Session หมดอายุ`, `info`,`กรุณา Login ใหม่อีกครั้ง`, )
                await this.reToken();
                await this.logout();
                await location.reload();
            } else {
                await this.setUser()
            }
        }
    }

    public async checkUserLogin() { 
        if (this.token) {
            await this.storeToken(this.token);
            let user = await this.getUser();
            console.log(`[AUTH]`, `LOGIN-CHECK`, "INTOKEN");
            if (user) { 
                let path = Vue.prototype.$currentPathName()  
                if (path == 'auth-login' || path == 'auth-register' || path == 'auth-forgot' ||path == 'auth-adminlogin'  ) {
                    if(user.is_employer){
                        await Vue.prototype.$go(`/admin/`)
                    } else{
                        await Vue.prototype.$go(`/app/`)
                    }
                }
            } else {
                await this.logout()
                await location.reload()
            }
        } else {
            console.log(`[AUTH]`, `LOGIN-CHECK`, "NOTOKEN");
            await Vue.prototype.$go(`/auth/login/`)
        }

    }

    public async isLogin() {
        return (this.user) ? true : false
    }

    public async logout() {
        try {
            await localStorage.clear(); 
            await location.reload()
        } catch (error) {
            await location.reload()
        }
    }

 
 
}

import store from "@/vuexes"
import moment from "moment";
import { AsyncComponent } from "vue";
export const Auth = new AuthModule({ store, name: "Auth" })