'use strict';

const Controller = require('egg').Controller;

class MusicController extends Controller {
    //获取歌手
    async ar() {
        const { ctx } = this;//${this.ctx.query.name}
        let artists = await this.app.mysql.query(`SELECT * from artists`);
        if (!artists.length) {
            ctx.body = {
                code: 1,
                data: '错误'
            }
        } else {
            ctx.body = {
                code: 0,
                data: artists
            }
        }
    }
    //获取歌手歌曲
    async song() {
        const { ctx } = this;//${this.ctx.query.name}
        //通过歌手查找songs表中的数据
        console.log(this.ctx.query.name);
        let s = await this.app.mysql.query(`SELECT * from songs where aname='${this.ctx.query.name}'`);
        let ar = await this.app.mysql.query(`SELECT * from ar where name='${this.ctx.query.name}'`);
        // let al = await this.app.mysql.query(`SELECT * from ar where name='${this.ctx.query.name}'`);
        let songs = [];
        // let song = {};
        // let ar = artists;
        // let al = {};
        s.forEach((ele)=>{
            songs.push({
                id:ele.id ,
                name:ele.name,
                mv:ele.mv,
                fee:ele.fee,
                dt:ele.dt,
                ar,
            al:{
               name:ele.sname,
               picUrl:ele.picUrl 
            }})
        })
        // for (let i = 0; i < s.length; i++) {
        //     al[0]=s[i].sname;
        //     let song = s[i];
        //     songs.push({s[i]})
        // }
        // let al = await this.app.mysql.query(`SELECT * from artists,songs where artists.songs.aname`);
        // songs.push({s,artists})
        if (!s.length) {
            ctx.body = {
                code: 1,
                songs: '错误'
            }
        } else {
            ctx.body = {
                code: 0,
                songs:songs
            }
        }
    }
    //查找歌手
    async artists() {
        const { ctx } = this;//${this.ctx.query.name}
        // console.log(this.ctx.query,111);
        let result = await this.app.mysql.query(`SELECT * from artists where name like '%${this.ctx.query.sname}%' `);
        // let result1 = await this.app.mysql.query(`SELECT * from songs where aname like '${this.ctx.query.sname}' or name like '${this.ctx.query.sname}' `);
        // let result2 = await this.app.mysql.query(`SELECT * from songs where aname like '${this.ctx.query.sname}' `);
        // console.log(result);
        if (!result.length) {
            ctx.body = {
                code: 1,
                data: '错误'
            }
        } else {
            ctx.body = {
                code: 0,
                data: result
            }
        }
    }
    //查找歌曲
    async songs() {
        const { ctx } = this;
        // let result = await this.app.mysql.query(`SELECT * from songs`);
        let result = await this.app.mysql.query(`SELECT * from songs where aname like '${this.ctx.query.sname}' or name like '${this.ctx.query.sname}' limit 10`);
        // console.log(result);
        if (!result.length) {

            ctx.body = {
                code: 1,
                data: '错误'
            }
        } else {
            ctx.body = {
                code: 0,
                data: result
            }
        }
    }
    //更新歌曲
    async updataSongs() {
        const { ctx } = this;//${this.ctx.query.name}
        let result = await this.app.mysql.query(`UPDATE songs set name='${this.ctx.query.name}', aname='${this.ctx.query.aname}', sname='${this.ctx.query.sname}', dt=${this.ctx.query.dt} where id = ${this.ctx.query.id} `);
        // console.log(result.length,111111);
        ctx.body = {
            code: 1,
            data: result
        }
    }
    //测试添加歌曲
    async dd() {
        const { ctx } = this;//artists
        // let result = await this.app.mysql.query(`SELECT * from artists`);
        let result = await this.app.mysql.query(`INSERT INTO artists VALUES(${this.ctx.query.id}, '${this.ctx.query.name}', '${this.ctx.query.picUrl}', ${this.ctx.query.albumSize}, ${this.ctx.query.musicSize});`);
        console.log(this.ctx.query);
        if (!result.length) {
            ctx.body = {
                code: 1,
                data: '错误'
            }
        } else {
            ctx.body = {
                code: 0,
                data: this.ctx.query
            }
        }
    }
    //添加歌曲
    async dd1() {
        const { ctx } = this;
        let result1 = await this.app.mysql.query(`INSERT INTO songs VALUES(
            ${this.ctx.query.id}, 
            '${this.ctx.query.name}', 
            '${this.ctx.query.aname}',
            '${this.ctx.query.sid}',
            '${this.ctx.query.sname}',
            '${this.ctx.query.picurl}',
            ${this.ctx.query.dt}, 
            ${this.ctx.query.fee}, 
            ${this.ctx.query.mv});
            `);
        // let result2 = await this.app.mysql.query(`INSERT INTO ar VALUES(${this.ctx.query.arid}, '${this.ctx.query.arname}');`);
        // let result3 = await this.app.mysql.query(`INSERT INTO al VALUES(${this.ctx.query.alid}, '${this.ctx.query.alsname}', '${this.ctx.query.alpicurl}');`);
        // console.log(this.ctx.query);
        if (!result1.length) {
            ctx.body = {
                code: 1,
                data: '错误'
            }
        } else {
            ctx.body = {
                code: 0,
                data: this.ctx.query
            }
        }
    }

    //删除歌曲
    async delSongs() {
        const { ctx } = this;
        let result = await this.app.mysql.query(`delete from songs where id = ${this.ctx.query.id}`);
        console.log(result);

        ctx.body = {
            code: 0,
            data: result
        }
    }
    //更新歌手
    async gsup() {
        const { ctx } = this;//${this.ctx.query.name}
        // 修改歌曲表
        let result1 = await this.app.mysql.query(`UPDATE songs set aname='${this.ctx.query.aname}' where sid = ${this.ctx.query.id} `);
        // 修改歌手表
        let result = await this.app.mysql.query(`UPDATE artists set name='${this.ctx.query.aname}' where id = ${this.ctx.query.id} `);
        // console.log(result);
        ctx.body = {
            code: 1,
            data: result
        }
    }
        //显示歌曲列表
        async songss() {
            const { ctx } = this;
            let result = await this.app.mysql.query(`SELECT * from songs order by aname desc limit ${(this.ctx.query.num - 1) * 10},10 `);
            let res = await this.app.mysql.query(`SELECT count(id) as num from songs`);
    
            if (!result.length) {
                ctx.body = {
                    code: 1,
                    data: '错误'
                }
            } else {
                ctx.body = {
                    code: 0,
                    data: result,
                    data1: res
                }
            }
        }
    


}

module.exports = MusicController;

