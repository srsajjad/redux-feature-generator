#!/usr/bin/env node

let fs = require('fs')

try {
  let compName = process.argv[2]
  let finalCompName = reduceDash(compName)
  // console.log('finalCompName', finalCompName)
  // let buildThunk = process.argv[3] ? !!process.argv[3].includes('-t') : false

  let componentName = finalCompName
  let containerName = finalCompName + 'Container'
  let actionName = finalCompName + 'Action'
  let reducerName = finalCompName + 'Reducer'
  let indexName = 'index.js'
  // let thunkName = finalCompName + 'Thunk' + '.js'

  createFile(Component(componentName), `./${componentName}.js`)
  createFile(
    Container(componentName, actionName, containerName),
    `./${containerName}.js`
  )
  createFile(Action(actionName), `./${actionName}.js`)
  createFile(Reducer(reducerName), `./${reducerName}.js`)
  createFile(CreateIndex(containerName), `./${indexName}`)

  console.log('Done')
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

function reduceDash (str) {
  let individualWordArr = str.split('-')
  let reducedArr = individualWordArr.map(n => toTitle(n))
  let finalStr = reducedArr.join('')
  return finalStr
}

function createFile (data, filePath) {
  fs.writeFile(filePath, data, err => {
    if (err) throw err
  })
}

function Component (componentName) {
  return `
  import React from 'react'

  const ${componentName} = () => {
    return (
      <div>
        CONTENT
      </div>
    )
  }  
  export default ${componentName}
  `
}

function Container (componentName, actionName, containerName) {
  return `
  import React, {Component} from 'react'
  import { connect } from 'react-redux'
  import { ${actionName} } from './${actionName}'
  import ${componentName} from './${componentName}'

  const mapStateToProps = state => ({
      
  })

  const mapDispatchToProps = () => ({
      
  })

  class ${containerName} extends Component{
    render(){
      return(
        <div>
          Container Content
        </div>
      )
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(${containerName})

  `
}

function Action (actionName) {
  return `
  export const ${actionName} = x => {
    return {
      type: '' // Cap Letter
    }
  }
  `
}

function Reducer (reducerName) {
  return `
  export const ${reducerName} = (state = [], action) => {
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
  import ${containerName} from './${containerName}'
  export default ${containerName}
  `
}
