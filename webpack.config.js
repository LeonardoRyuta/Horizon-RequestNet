import { join } from "path";
import HTMLPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const entry = {
  index: "./src/main.tsx"
};
export const mode = "production";
export const module = {
  rules: [
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: "ts-loader",
          options: {
            compilerOptions: { noEmit: false },
          }
        }
      ],
      exclude: /node_modules/,
    },
    {
      exclude: /node_modules/,
      test: /\.css$/i,
      use: [
        "style-loader",
        "css-loader"
      ]
    },
  ],
};
export const plugins = [
  new CopyPlugin({
    patterns: [
      { from: "manifest.json", to: "../manifest.json" },
    ],
  }),
  ...getHtmlPlugins(["index"]),
];
export const resolve = {
  extensions: [".tsx", ".ts", ".js", ".jsx"],
};
export const output = {
  path: join(__dirname, "dist/js"),
  filename: "[name].js",
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: "React extension",
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}

export default {
  entry,
  mode,
  module,
  plugins,
  resolve,
  output,
};