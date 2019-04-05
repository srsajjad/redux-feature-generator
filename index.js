#!/usr/bin/env node

let fs = require('fs')

try {
  var compName = process.argv[2]
  var finalCompName = reduceDash(compName)
  // console.log('finalCompName', finalCompName)
  // let buildThunk = process.argv[3] ? !!process.argv[3].includes('-t') : false

  var componentName = finalCompName
  var containerName = finalCompName + 'Container'
  var actionName = finalCompName + 'Action'
  var reducerName = finalCompName + 'Reducer'
  var slectorName = finalCompName + 'Selector'
  var typesName = finalCompName + 'Types'
  var styleName = finalCompName + 'Styles'
  var thunkName = finalCompName + 'Thunk'
  var indexName = 'index.js'

  createFile(Component(), `./${componentName}.js`)
  createFile(
    Container(),
    `./${containerName}.js`
  )
  createFile(Action(), `./${actionName}.js`)
  createFile(Reducer(), `./${reducerName}.js`)
  createFile(CreateIndex(), `./${indexName}`)

  createFile(Selector(), `./${selectorName}`)
  createFile(Types(), `./${typesName}`)
  createFile(Style(), `./${styleName}`)
  createFile(Thunk(), `./${thunkName}`)
  

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
