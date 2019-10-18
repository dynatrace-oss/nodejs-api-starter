import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

const config: webpack.Configuration = {
  entry: path.join(__dirname, 'src', 'bin', 'server.ts'),
  devtool: 'source-map',
  node: {
    __dirname: true,
  },
  externals: [nodeExternals()],
  mode: process.env.NODE_ENV as 'development' | 'production' | 'none',
  module: {
    rules: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: { fix: true },
          },
        ],
      },
      { test: /\.tsx?$/, loader: ['ts-loader'] },
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.bundle.js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['*', '.webpack.js', '.test.ts', '.ts', '.tsx', '.js', '.spec.ts'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
  target: 'node',
  optimization: {
    minimizer: [
      new TerserPlugin({
        include: /\.ts($|\?)/i,
        exclude: /\.controller\.ts/i,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
};

export default config;
