const mix = require('laravel-mix');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/css/app.css', 'public/css')
   .webpackConfig({
       plugins: [
           new BrowserSyncPlugin({
               host: 'localhost',
               port: 3000,
               proxy: 'http://127.0.0.1:8000/', // Your Laravel dev server
               files: ['resources/views/**/*.blade.php', 'public/**/*.*']
           })
       ]
   });
