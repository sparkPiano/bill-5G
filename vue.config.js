const vuxLoader = require("vux-loader");
const path = require("path");
const vConsolePlugin = require("vconsole-webpack-plugin");
// gzip压缩插件
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const debug = process.env.NODE_ENV !== "production";

const prodDir = "/CCBRCS/RCS_5GWF";
const envDir = "/";
const outputDir = "RCS_5GWF";
const envHost = "localhost";
const envPort = 8090;

module.exports = {
  // 基本路径
  publicPath: !debug ? prodDir : envDir,
  // 输出文件目录
  outputDir: outputDir,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,

  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // eslint-disable-next-line no-unused-vars
  chainWebpack: config => {
    config.module
      .rule("images")
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        bypassOnDebug: true,
        limit: 4096
      })
      .end();
    if (debug) {
      // 开发环境
    } else {
      // 生产环境
    }
    // less Loader
    // const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    // types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));
    // const oneOfsMap = config.module.rule('scss').oneOfs.store;
    // oneOfsMap.forEach(item => {
    //     item
    //         .use('sass-resources-loader')
    //         .loader('sass-resources-loader')
    //         .options({
    //             // 全局变量资源路径
    //             resources: path.resolve(__dirname, '../src/assets/styles/global.less')
    //                 // 也可以选择全局变量路径数组, 如果你有多个文件需要成为全局,就可以采用这种方法
    //                 // resources: [path.resolve(__dirname, '../src/assets/styles/vars.scss'), path.resolve(__dirname, '../src/assets/styles/mixin.scss')]
    //                 // 或者你可以将多个scss文件@import到一个main.scss用第一种方法，都是可以的
    // resources: path.resolve(__dirname, '../src/assets/styles/global.less')
    //         })
    //         .end();
    // });
  },
  configureWebpack: config => {
    //生产环境去掉vconsole调试器
    let pluginsDev = [
      new vConsolePlugin({
        filter: [],
        enable: !debug
      })
    ];
    let plugins = [
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp(
          "\\.(" + ["js", "css", "json", "ttf", "svg", "html"].join("|") + ")$"
        ),
        threshold: 0,
        minRatio: 0.8
      })
    ];
    config.plugins = [...config.plugins, ...pluginsDev, ...plugins];
    if (!debug) {
      // 为生产环境修改配置...
      config.mode = "production";
      // 将每个依赖包打包成单独的js文件
      let optimization = {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `ccb.5g.${packageName.replace("@", "")}`;
              }
            }
          }
        }
      };
      Object.assign(config, {
        optimization
      });
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
    }
    // vux 相关配置,使用vux-ui
    vuxLoader.merge(config, {
      options: {},
      plugins: ["vux-ui"]
    });

    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: [".js", ".json", ".vue"],
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@c": path.resolve(__dirname, "./src/components"),
          "@v": path.resolve(__dirname, "./src/views")
        }
      }
    });
    // Object.assign(config, {
    //   // 开发生产共同配置
    //   resolve: {
    //     alias: {
    //       "@": path.resolve(__dirname, "./src"),
    //       "@c": path.resolve(__dirname, "./src/components"),
    //       "@p": path.resolve(__dirname, "./src/views")
    //     } // 别名配置
    //   }
    // });
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  runtimeCompiler: true, //包含运行时编译器的 Vue 构建版本
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
        // 注意：以下配置在 Vue CLI v4 与 v3 之间存在差异。
        // Vue CLI v3 用户可参考 css-loader v1 文档
        // https://github.com/webpack-contrib/css-loader/tree/v1.0.1
        modules: {
          localIdentName: "[name]-[hash]"
        },
        localsConvention: "camelCaseOnly"
      },
      stylus: {
        // 这里的选项会传递给 stylus-loader
      },
      postcss: {
        // plugins: [
        //     //require('postcss-px2rem')({remUnit: 30}), // 换算的基数 postcss-px2rem
        //     // require('postcss-pxtorem')({
        //     //     rootValue : 1, // 换算的基数 postcss-pxtorem
        //     //     selectorBlackList  : ['weui','mu'], // 忽略转换正则匹配项
        //     //     propList   : ['*'],
        //     // })
        // ]
      },
      less: {
        // modifyVars: {
        //     hack: `true;
        //     @import "${path.resolve(__dirname, './src/assets/styles/global.less')}";
        //     @import "${path.resolve(__dirname, './src/assets/styles/variables.less')}";
        //     `
        // },
        // globalVars: {
        //     primary: '#ffffff'
        // }
      },
      sass: {
        // prependData: `@import "${path.resolve(__dirname, './src/assets/styles/global.sass')}"`
      },
      scss: {
        // prependData: `@import "${path.resolve(__dirname, './src/assets/styles/global.scss')}"`
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false //vue-cli 3,x
    //requireModuleExtension: false //vue-cli 4.x
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: true, //配置自动打开浏览器
    host: envHost,
    port: envPort,
    https: false, // 编译失败时刷新页面
    hot: true,
    hotOnly: false,
    overlay: {
      // 全屏模式下是否显示脚本错误
      warnings: true,
      errors: true
    },
    clientLogLevel: "info",
    proxy: {
      // 设置代理
      //  // proxy all requests starting with /api to jsonplaceholder
      //  'http://localhost:8080/': {
      //      target: 'https://baidu.com:8080', //真实请求的目标地址
      //      changeOrigin: true,
      //      ws:true,
      //      pathRewrite: {
      //          '^http://localhost:8080/': ''
      //      }
      //  },
      //  'http://localhost:8080/': {
      //      target: 'http://baidu.com:8080', //真实请求的目标地址
      //      changeOrigin: true,
      //      pathRewrite: {
      //          '^http://localhost:8080/': ''
      //      }
      //  }
      "/CCBRCS/ccbsns": {
        target: "http://128.192.179.186/CCBRCS/ccbsns/", //真实请求的目标地址
        changeOrigin: true,
        pathRewrite: {
          "^/CCBRCS/ccbsns": ""
        }
      },
      "/CCBRCS/ccbsns/SNSService": {
        target: "http://128.192.179.186/CCBRCS/ccbsns/SNSService", //真实请求的目标地址
        changeOrigin: true,
        pathRewrite: {
          "^/CCBRCS/ccbsns/SNSService": ""
        }
      }
    },
    // eslint-disable-next-line no-unused-vars
    before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // path.resolve(__dirname, '@/assets/styles/global.less'),
        // path.resolve(__dirname, '@/assets/styles/variables.less')
      ]
    }
  }
};

// eslint-disable-next-line no-unused-vars
function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        // 需要全局导入的less路径，这里引入了两个less文件
        //path.resolve(__dirname, './src/assets/css/global.less'),
        path.resolve(__dirname, "@/assets/styles/global.less"),
        path.resolve(__dirname, "@/assets/styles/variables.less")
      ]
    })
    .end();
}
