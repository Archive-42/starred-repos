import { join } from 'path'
import * as Log from '../../output/log'
import babelLoader from './babel-loader/src/index'
import { getIsPageFile, getIsRpcFile } from '../../utils'

// increment 'p' to invalidate cache
// eslint-disable-next-line no-useless-concat
const cacheKey = 'babel-cache-' + 'p' + '-'
const nextBabelPreset = require('../../babel/preset')

const customBabelLoader = babelLoader((babel) => {
  const presetItem = babel.createConfigItem(nextBabelPreset, {
    type: 'preset',
  })
  const applyCommonJs = babel.createConfigItem(
    require('../../babel/plugins/commonjs'),
    { type: 'plugin' }
  )
  const commonJsItem = babel.createConfigItem(
    require('next/dist/compiled/babel/plugin-transform-modules-commonjs'),
    { type: 'plugin' }
  )

  const configs = new Set()

  return {
    customOptions(opts) {
      const custom = {
        isServer: opts.isServer,
        pagesDir: opts.pagesDir,
        development: opts.development,
        hasReactRefresh: opts.hasReactRefresh,
        hasJsxRuntime: opts.hasJsxRuntime,
      }
      const filename = join(opts.cwd, 'noop.js')
      const loader = Object.assign(
        opts.cache
          ? {
              cacheDirectory: join(opts.distDir, 'cache', 'next-babel-loader'),
              cacheIdentifier:
                cacheKey +
                (opts.isServer ? '-server' : '') +
                '-new-polyfills' +
                (opts.development ? '-development' : '-production') +
                (opts.hasReactRefresh ? '-react-refresh' : '') +
                (opts.hasJsxRuntime ? '-jsx-runtime' : '') +
                JSON.stringify(
                  babel.loadPartialConfig({
                    filename,
                    cwd: opts.cwd,
                    sourceFileName: filename,
                  }).options
                ),
            }
          : {
              cacheDirectory: false,
            },
        opts
      )

      delete loader.isServer
      delete loader.cache
      delete loader.distDir
      delete loader.pagesDir
      delete loader.development
      delete loader.hasReactRefresh
      delete loader.hasJsxRuntime
      return { loader, custom }
    },
    config(
      cfg,
      {
        source,
        customOptions: {
          isServer,
          pagesDir,
          development,
          hasReactRefresh,
          hasJsxRuntime,
        },
      }
    ) {
      const filepath = this.resourcePath
      const options = Object.assign({}, cfg.options)
      const relativePathFromRoot = filepath.replace(pagesDir, '')
      const isPageFile = getIsPageFile(relativePathFromRoot)
      const isRpcFile = getIsRpcFile(relativePathFromRoot)

      if (cfg.hasFilesystemConfig()) {
        for (const file of [cfg.babelrc, cfg.config]) {
          // We only log for client compilation otherwise there will be double output
          if (file && !isServer && !configs.has(file)) {
            configs.add(file)
            Log.info(`Using external babel configuration from ${file}`)
          }
        }
      } else {
        // Add our default preset if the no "babelrc" found.
        options.presets = [...options.presets, presetItem]
      }

      options.caller.isServer = isServer
      options.caller.isDev = development
      options.caller.hasJsxRuntime = hasJsxRuntime
      options.caller.pagesDir = pagesDir

      const emitWarning = this.emitWarning.bind(this)
      Object.defineProperty(options.caller, 'onWarning', {
        enumerable: false,
        writable: false,
        value: (options.caller.onWarning = function (reason) {
          if (!(reason instanceof Error)) {
            reason = new Error(reason)
          }
          emitWarning(reason)
        }),
      })

      options.plugins = options.plugins || []

      if (hasReactRefresh) {
        const reactRefreshPlugin = babel.createConfigItem(
          [require('react-refresh/babel'), { skipEnvCheck: true }],
          { type: 'plugin' }
        )
        options.plugins.unshift(reactRefreshPlugin)
        if (!isServer) {
          const noAnonymousDefaultExportPlugin = babel.createConfigItem(
            [require('../../babel/plugins/no-anonymous-default-export'), {}],
            { type: 'plugin' }
          )
          options.plugins.unshift(noAnonymousDefaultExportPlugin)
        }
      }

      if (!isServer && isPageFile) {
        const pageConfigPlugin = babel.createConfigItem(
          [require('../../babel/plugins/next-page-config')],
          { type: 'plugin' }
        )
        options.plugins.push(pageConfigPlugin)

        const diallowExportAll = babel.createConfigItem(
          [
            require('../../babel/plugins/next-page-disallow-re-export-all-exports'),
          ],
          { type: 'plugin' }
        )
        options.plugins.push(diallowExportAll)
      }

      // If the file has `module.exports` we have to transpile commonjs because Babel adds `import` statements
      // That break webpack, since webpack doesn't support combining commonjs and esmodules
      if (source.indexOf('module.exports') !== -1) {
        options.plugins.push(applyCommonJs)
      }

      options.plugins.push([
        require.resolve('next/dist/compiled/babel/plugin-transform-define'),
        {
          'process.env.NODE_ENV': development ? 'development' : 'production',
          'typeof window': isServer ? 'undefined' : 'object',
          'process.browser': isServer ? false : true,
        },
        'next-js-transform-define-instance',
      ])

      if (isPageFile) {
        if (!isServer) {
          // TODO - only do this if it's a page but not api route
          options.plugins.push([
            require.resolve('../../babel/plugins/next-ssg-transform'),
            {},
          ])
        }
      }

      if (isRpcFile) {
        if (isServer) {
          const rpcServerTransformPlugin = babel.createConfigItem(
            [require('../../babel/plugins/blitz-rpc-server-transform')],
            { type: 'plugin' }
          )
          options.plugins.push([rpcServerTransformPlugin])
        } else {
          const rpcClientPlugin = babel.createConfigItem(
            [require('../../babel/plugins/blitz-rpc-client')],
            { type: 'plugin' }
          )
          options.plugins.push([rpcClientPlugin])
        }
      }

      // As next-server/lib has stateful modules we have to transpile commonjs
      options.overrides = [
        ...(options.overrides || []),
        {
          test: [
            /next[\\/]dist[\\/]shared[\\/]lib/,
            /next[\\/]dist[\\/]client/,
            /next[\\/]dist[\\/]pages/,
          ],
          plugins: [commonJsItem],
        },
      ]

      return options
    },
  }
})

export default customBabelLoader
