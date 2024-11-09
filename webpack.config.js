import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default () => {
    return {
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.[contenthash].js',
            clean: true,
        },
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
                        }
                    },
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
            }),
        ],
        devServer: {
            historyApiFallback: true,
            static: './dist',
            hot: true,
            open: true,
            port: 4567,
        },
    };
}