import {cwd, dir, join, log, exist} from './helpers/utils'
import options from './options'

export default class Module {
  constructor(opts) {
    /**
     * modules find path:
     *
     * 1. current folder ＝> process.cwd()/node_modules
     * 2. template folder => data/templates/template/node_modules
     * 3. fbi global folder => data/node_modules
     * 4. system globale folder => username/node_modules
     *
     */

    this.modulePaths = [
      cwd('node_modules'),
      dir(options.data, opts.template ? 'templates/' + opts.template : '', 'node_modules'),
      dir(options.data, 'node_modules'),
      ''
    ]

    this.modulePaths = Array.from(new Set(this.modulePaths)) // duplicate removal
  }

  get(name) {
    let ret

    for (let item of this.modulePaths) {
      let _p = join(item, name)
      try {
        let found = require.resolve(_p)
        if (found) {
          ret = item ? item : 'global'
          break
        }
      } catch (e) {

      }
    }

    return ret
  }

  set(name, value) {
    this.modules.set(name, value)
  }

  del(name) {
    this.modules.delete(name)
  }

  delAll() {
    this.modules.clear()
  }

  has(name) {
    return this.modules.has(name)
  }

  getAll() {
    let modules = {}
    modules[this.mod] = {}
    for (let [key, value] of this.modules) {
      modules[this.mod][key] = value
    }
    return modules
  }

  sync() {

  }

}