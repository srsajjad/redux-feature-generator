#!/usr/bin/env node

let fs = require('fs')

try {
  let compName = process.argv[2]
  let finalCompName = toTitle(compName)
  console.log('finalCompName', finalCompName)
  // let buildThunk = process.argv[3] ? !!process.argv[3].includes('-t') : false

  let componentName = finalCompName + '.js'
  let containerName = finalCompName + 'Container' + '.js'
  let actionName = finalCompName + 'Action' + '.js'
  let reducerName = finalCompName + 'Reducer' + '.js'
  let indexName = 'index.js'
  // let thunkName = finalCompName + 'Thunk' + '.js'

  createFile(Component(), `./${componentName}`)
  createFile(Container(), `./${containerName}`)
  createFile(Action(), `./${actionName}`)
  createFile(Reducer(), `./${reducerName}`)
  createFile(CreateIndex(finalCompName+'Container'), `./${indexName}`)
} catch (e) {
  console.log('Did not follow the instructions ! Did you ?', e)
}

function toTitle (str) {
  let x = Array.from(str)
  let y = x.map((n, i) => {
    if (i === 0) return n.toUpperCase()
    else return n.toLowerCase()
  })
  return y.join('')
}

function createFile (data, filePath) {
  fs.writeFile(filePath, data, err => {
    if (err) throw err
  })
}

function Component () {
  return `
  import React, { Component } from 'react'

  export default class componentName extends Component {
    render () {
      return (
        <div>
          CONTENT
        </div>
      )
    }
  }
  `
}

function Container () {
  return `
  import { connect } from 'react-redux'
  import component from '../components/component'
  import { actionCreator } from '../actionPath'

  const mapStateToProps = (state, ownProps) => ({
      
  })

  const mapDispatchToProps = {
      
  }

  export default connect(mapStateToProps, mapDispatchToProps)(component)

  `
}

function Action () {
  return `
  export let CountAction = x => {
    return {
      type: '' // Cap Letter
    }
  }
  `
}

function Reducer () {
  return `
  export const reducerName = (state = [], action) => {
    switch (action.type) {
      case 'ACTION_TYPE':
        return {
          ...state
        }
      default:
        return state
    }
  }
  `
}

function CreateIndex (containerName) {
  return `
  import { ${containerName} } from './${containerName}'
  export { ${containerName} }
  `
}
