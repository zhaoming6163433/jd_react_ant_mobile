const { override, fixBabelImports, addLessLoader, addWebpackAlias,useEslintRc } = require('customize-cra');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
const productionGzipExtensions = ['js', 'css'];
const path = require('path');
module.exports = override(
    //按需加载antd的组件
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: true
    }),
    //配置less
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },
    }),
    //设置绝对路径
    addWebpackAlias({
        ["assets"]: path.resolve(__dirname, "src/assets"),
        ["mock"]: path.resolve(__dirname, "src/mock"), 
        ["services"]: path.resolve(__dirname, "src/services"),        
        ["components"]: path.resolve(__dirname, "src/components"),
        ["@"]: path.resolve(__dirname, "src"),
        ["utils"]: path.resolve(__dirname, "src/utils")
    }),
    useEslintRc(),
    (config) => {
        config.module.rules[2].oneOf[5].use.push({
            loader: 'sass-resources-loader',
            options: {
                resources:  [
                path.resolve(__dirname, 'src/assets/css/common/common_color.scss'),
                path.resolve(__dirname, 'src/assets/css/common/mixin.scss')
                ]
            }
        })
        if (process.env.NODE_ENV === 'production') {
            //生产去掉console.log
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
            // 关掉 sourceMap
            config.devtool = false;   
            config.output.publicPath = process.env.NODE_ENV === "production" ? "./" : "/";
            config.plugins.push(
                new webpack.DllReferencePlugin({
                  context: process.cwd(),
                  manifest: require("./public/dll/react-manifest.json")
                })
            );
            // 生成gzip
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
        }
        
        return config
    }
);
