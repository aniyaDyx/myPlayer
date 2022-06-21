const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // lintOnSave: true,
    // https:false,
    // secure:false,
    proxy: { // 目的是解决跨域，若测试环境不需要跨域，则不需要进行该配置
      '/server': {
        target: 'https://netease-cloud-music-api-beta-lyart.vercel.app', // 目标 API 地址
        ws: true, // 如果要代理 websockets
        changeOrigin: true, // 将主机标头的原点更改为目标URL
        pathRewrite: {
          '^/server': '/'
        }
      },
      '/api': {
				target: 'http://127.0.0.1:7001', // 目标 API 地址
				ws: true, // 如果要代理 websockets
				changeOrigin: true, // 将主机标头的原点更改为目标URL
				pathRewrite: {
					'^/api': ''
				}
			},
			'/ddd': {//https://www.baidu.com/s?wd=apple&pn=1&rn=10&tn=json
				target: 'https://www.baidu.com', // 目标 API 地址
				ws: true, // 如果要代理 websockets
				changeOrigin: true, // 将主机标头的原点更改为目标URL
				pathRewrite: {
					'^/ddd': ''
				}
			},
		}
	},
  
    
 


  // devServer: {
  //   lintOnSave: true,
  //   https:false,
  //   secure:false,
  //   proxy: { // 目的是解决跨域，若测试环境不需要跨域，则不需要进行该配置
  //     '/api': {
  //       target: 'https://netease-cloud-music-api-beta-lyart.vercel.app', // 目标 API 地址
  //       ws: true, // 如果要代理 websockets
  //       changeOrigin: true, // 将主机标头的原点更改为目标URL
  //       pathRewrite: {
  //         '^/api': '/'
  //       }
  //     }
  //   }
    
  // }
 

})
