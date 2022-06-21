'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = 'hi, egg';
    }
    //1、用户名登录 获取头像返回
    async loginbyname() {
        const { ctx, app } = this;
        //用于接收post 请求的参数
        // console.log(ctx.request.body);
        let result = await this.app.mysql.query(`SELECT user_id,password,signature,user_img,phone,gender from user where user_name='${ctx.request.body.username}'`);
        console.log(111111111);
        console.log(result);
        console.log(2222222);
        console.log(result[0]);

        if (result.length == 0) {
            ctx.body = {
                code: 1,
                msg: "用户不存在，请注册！"
            }
        } else {
            if (result[0].password == ctx.request.body.password) {
                console.log(777777777777);
                this.ctx.session = {
                    user_id: result[0].user_id,
                    // user_img:result[0].user_img,
                }
                console.log(this.ctx.session.user_id);
                ctx.body = {
                    code: 0,
                    msg: "登录成功！",
                    info: {
                        user_img: result[0].user_img,
                        phone: result[0].phone,
                        gender: result[0].gender,
                        signature: result[0].signature
                    }
                };
            } else {
                ctx.body = {
                    code: 2,
                    msg: "密码错误~登录失败！"
                };
            }
        }
    }



    //2、注册
    async register() {
        const { ctx } = this;
        //用于接收post 请求的参数
        // console.log(ctx.request.body);
        let result = await this.app.mysql.query(`SELECT user_id from user where user_name='${ctx.request.body.username}'`);
        // console.log(result)
        if (result.length == 0) {
            let registerAct = await this.app.mysql.query(`INSERT INTO user(user_name,password,phone) VALUES('${ctx.request.body.username}','${ctx.request.body.password}','${ctx.request.body.phone}')`);
            if (registerAct.affectedRows) {
                ctx.body = {
                    code: 0,
                    msg: "注册成功,请登录"
                }
            }
        } else {
            ctx.body = {
                code: 1,
                msg: "该用户已存在，请登录！！"
            }
        }
    }



}

module.exports = HomeController;
