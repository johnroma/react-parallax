import { defineConfig } from 'tsup'
import path from 'path'
import fs from 'fs'
import postcss from 'postcss'
import postcssModules from 'postcss-modules'
import cssnano from 'cssnano'
import { generateScopedName } from 'hash-css-selector'

export default defineConfig({
  entry: ['src/components/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  esbuildPlugins: [
    {
      name: 'css-module',
      setup(build) {
        build.onResolve({ filter: /\.module\.css$/, namespace: 'file' }, (args) => {
          return {
            path: `${args.path}#css-module`,
            namespace: 'css-module',
            pluginData: {
              pathDir: path.join(args.resolveDir, args.path),
            },
          }
        })
        build.onLoad({ filter: /#css-module$/, namespace: 'css-module' }, async (args) => {
          const { pluginData } = args as {
            pluginData: { pathDir: string }
          }

          const source = await fs.promises.readFile(pluginData.pathDir, 'utf8')

          let cssModule: any = {}
          const result = await postcss([
            postcssModules({
              generateScopedName: function (name, filename) {
                const newSelector = generateScopedName(name, filename)
                cssModule[name] = newSelector
                return newSelector
              },
              getJSON: () => {},
              scopeBehaviour: 'local',
            }),
            cssnano({ preset: 'default' }), // Add cssnano here for minification
          ]).process(source, { from: pluginData.pathDir })

          // Write the CSS to styles.css
          await fs.promises.writeFile('dist/styles.css', result.css)

          // Export the CSS module object
          return {
            pluginData: { css: result.css, json: cssModule },
            contents: `export default ${JSON.stringify(cssModule)}`,
          }
        })
      },
    },
  ],
})
