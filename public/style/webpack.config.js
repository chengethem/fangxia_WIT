const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const output = path.resolve(__dirname, '..', 'client/assets/');
// const meal_menu = path.resolve('./meal/menu/main.js');
// const store_distance = path.resolve('./meal/store/distance.js');
// const menu = path.resolve(__dirname, '..', 'client/static/scripts/wechat/menu.js');
// const table_place = path.resolve('./catering/table/place.js');
// const table_record = path.resolve('./catering/table/record.js');
// const table_reservation = path.resolve(__dirname, '..', 'client/static/scripts/wechat/reservation.js');
// const mp_menu = path.resolve('./mp/menu.js');
// const menu_location = path.resolve('./meal/menu/location.js');
// const customer = path.resolve('./catering/table/customer.js');
// const qrcode_mealmark = path.resolve('./qrcode/mealmark.js');
// const qrcode_stores = path.resolve('./qrcode/stores.js');
// const qrcode_receipt = path.resolve('./qrcode/receipt.js');
// const qrcode_enterprise = path.resolve('./qrcode/enterprise.js');
// const tack_away_payment = path.resolve('./tack-away/payment.js');
// const takeaway_map_amap = path.resolve('./takeaway/map_amap.js');
// const takeaway_test_map_amap = path.resolve('./takeaway/test/map_amap.js');
// const takeaway_storelist_onmap = path.resolve('./takeaway/storelist_onmap.js');

module.exports = {
  name: 'css',
  entry: {
    styles: [
      '/scss/pack.scss'
    ]
    // meal_menu,
    // menu,
    // table_place,
    // table_record,
    // table_reservation,
    // mp_menu,
    // store_distance,
    // menu_location,
    // customer,
    // qrcode_mealmark,
    // qrcode_stores,
    // qrcode_receipt,
    // qrcode_enterprise,
    // tack_away_payment,
    // takeaway_map_amap: [takeaway_map_amap],
    // takeaway_test_map_amap,
    // takeaway_storelist_onmap
  },
  output: {
    path: output,
    publicPath: '/assets/',
    filename: '[name].css',
    chunkFilename: '[name].css'
  },
  module: {
    loaders: [
      // {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      // {test: /\.jsx?$/, loader: 'babel-loader'},
      // {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      // {test: /\.scss$/, loader: ["style", "css", "scss"]}
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')}
    ]
  },
  resolve: {
    root: path.resolve('../'),
    modulesDirectories: ['node_modules']
  },
  // sassLoader: {
  //   includePaths: [path.join(__dirname, '../../..', 'node_modules/compass-mixins/lib'), path.resolve(__dirname, 'scss')]
  // },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    // new webpack.optimize.UglifyJsPlugin({
    //   mangle: {
    //     except: ['$super', '$', 'exports', 'require']
    //   },
    //   sourceMap: false
    // }),
    //new CleanWebpackPlugin(['assets'], {
    //  root: path.resolve(__dirname, '..', 'client'),
    //  verbose: true,
    //  dry: false
    //})
  ],
  //devtool: '#cheap-eval-source-map'
};
