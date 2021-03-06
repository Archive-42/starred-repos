'use strict'
const benchmark = require('./benchmarkFixture')
const path = require('path')
const writeYamlFile = require('write-yaml-file')
const loadYamlFile = require('load-yaml-file')

const RESULTS = path.join(__dirname, 'results')

module.exports = async function (pm, fixture, opts) {
  opts = opts || {}
  const limitRuns = opts.limitRuns || Infinity

  const pmVersion = require(path.join(__dirname, 'managers/node_modules', pm.name, 'package.json')).version
  const resultsFile = path.join(RESULTS, pm.scenario, pmVersion, `${fixture}.yaml`)
  const prevResults = await safeLoadYamlFile(resultsFile) || []

  if (prevResults.length >= limitRuns) return prevResults

  const newResults = await benchmark(pm, fixture, {
    hasNodeModules: opts.hasNodeModules
  })
  const results = [...prevResults, newResults]
  await writeYamlFile(resultsFile, results)
  return results
}

async function safeLoadYamlFile (filename) {
  try {
    return await loadYamlFile(filename)
  } catch (err) {
    if (err.code !== 'ENOENT') throw err
    return null
  }
}
