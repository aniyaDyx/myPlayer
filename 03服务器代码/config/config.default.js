/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.cluster = {
    listen: {
      port: 7001//配置端口
    }
  };
  //配置允许post请求
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    }
  }

        //配置跨域
        config.cors = {
          // origin: '*',
          origin:'http://localhost:8080',//cookie自带允许跨域
          allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
          credentials: true
        };
  

  // 数据库配置
  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: 'root',
      // 数据库名
      database: 'myplayer'
    },
    app: true,
    agent: false
  }

  //文件上传
  exports.multipart = {
    mode: 'file',
  };
  //配置session
  exports.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
    renew: true,
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1630939357831_5115';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
