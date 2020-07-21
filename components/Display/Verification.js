/**
 * @fileoverview Shows the display frame and renders all the
 * widgets inside of it
 */

import React from 'react'
import GridLayout from 'react-grid-layout'
import socketIOClient from 'socket.io-client'
import _ from 'lodash'
import { view } from 'react-easy-state'

import Frame from './Frame.js'
import HeightProvider from '../Widgets/HeightProvider'
import Widgets from '../../widgets'
import EmptyWidget from '../Widgets/EmptyWidget'

import { getVerification } from '../../actions/display'


class Verification extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     fcode:''
    }
    this.throttledRefresh = _.debounce(this.refresh, 1500)
  }
  

  componentDidMount() {
    this.refresh()
    const { host = 'http://localhost' } = this.props
    const socket = socketIOClient(host)
    socket.on('admin:update', () => this.throttledRefresh())
    
    require('crypto').randomBytes(3,  (err, buffer) => {
       var token = buffer.toString('hex')
       this.setState({fcode:token})
       })
 
  }

  componentDidUpdate(prevProps) {
    if (prevProps.display != this.props.display) this.refresh()
  }

  refresh = () => {
    //const { display } = this.props
    const fcode  = this.state.fcode
    
    const displayId = localStorage.getItem('displayId') ? localStorage.getItem('displayId') : null
    if(!displayId){
     getVerification(fcode).then((res) => {
     //console.log(_id+'-'+verifycode)
     if(res){
     localStorage.setItem('displayId', res._id)
     localStorage.setItem('verifycode', res.verifycode)
     location.reload(true)
     }
      //this.setState({ widgets, layout, statusBar })
    })
  }
  }

  render() {

    return (
      <Frame >
        <h1 style={{textAlign: 'center',marginTop: '20%',letterSpacing: '15px'}}>
         {this.state.fcode}
        </h1>
      </Frame>
    )
  }
}

export default view(Verification)
