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
  var selectorName = finalCompName + 'Selector'
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

function Component () {
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

function Container () {
  return `
  import React, { useEffect } from 'react'
  import { connect } from 'react-redux'
  import { getDataThunk } from './${thunkName}'
  import { getData } from './${selectorName}'
  import ${componentName} from './${componentName}'
  
  const mapStateToProps = state => ({
    data: getData(state)
  })
  
  const mapDispatchToProps = dispatch => ({
    fetchData: () => dispatch(getDataThunk())
  })
  
  const ContainerName = props => {
    useEffect(() => {
      props.fetchData()
    }, [])
  
    return (
      <${componentName} />
    )
    
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContainerName)
  
  `
}

function Action () {
  return `
  import * as types from './${typesName}'

  export const setData = payload => {
    return {
      type: types.SET_DATA,
      payload
    }
  }
  `
}

function Reducer () {
  return `
  import { createReducer } from 'redux-starter-kit'
  import * as types from './${typesName}'
  
  let initState = {
    data: {}
  }
  
  export const ${reducerName} = createReducer(initState, {
  
    [types.SET_DATA]: (state, action) => {
      state.data = action.payload
    }
    
  })
  
  `
}

function Selector () {
  return `
  import { createSelector } from 'redux-starter-kit'

  export const getData = createSelector(
    ['${reducerName}.data'],
    data => data
  )
  
  `
}

function Thunk () {
  return `
  import { setData } from './${actionName}'
  
  export const getDataThunk = () => {
    return async (dispatch, getState) => {
      try {

        let state = getState()
  
        let data = await fetch()
  
        dispatch(setData(data))

      } catch (err) {
        console.log('error occured', err)
      }  
    }
  }
  
  `
}

function Types () {
  return `
  export const SET_DATA = 'SET_DATA'
  `
}

function Style () {
  return `
  export const styles = theme => ({

    some_class: {
      backgroundColor: 'white',
      display: 'flex',

      '&:first-child': {
        marginTop: '2%'
      },

      '&:last-child': {
        marginBottom: '25px'
      },

      '@media (max-width:800px)': {
        width: '96%',
        paddingBottom: '35%'
      }
    }
    
  })
  
  `
}



function CreateIndex () {
  return `
  import ${containerName} from './${containerName}'
  export default ${containerName}
  `
}
