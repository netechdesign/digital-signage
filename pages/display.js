/**
 * @fileoverview Preview page (shows the display frame and renders all the
 * widgets inside of it)
 */

import React from 'react'
import { view } from 'react-easy-state'

import Display from '../components/Display/Display.js'
import Verification from '../components/Display/Verification.js'

import { display } from '../stores'

class DisplayPage extends React.Component {
  constructor(props) {
    super(props)
  }

  static async getInitialProps({ query, req }) {
    const displayId = query && query.display
    
    const host =
      req && req.headers && req.headers.host ? 'http://' + req.headers.host : window.location.origin

    return { host, displayId }
  }

  componentDidMount() {
    //const { displayId } = this.props
    //display.setId(displayId)
    const displayId = localStorage.getItem('displayId') ? localStorage.getItem('displayId') : null
    display.setId(displayId)
  }

  render() {
    const { host } = this.props
    if(display.id){
    return (
      <div className={'container'}>
        <Display host={host} display={display.id} />
     
        <style jsx>
          {`
            .container {
              display: flex;
              width: 100vw;
              height: 100vh;
            }
          `}
        </style>
        <style>
          {`
            * {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            *::-webkit-scrollbar {
                display: none;  // Safari and Chrome
            }
          `}
        </style>
      </div>
    )
          }else{
            return (
              <div className={'container'}>
               <Verification host={host} display={display.id} />
                <style jsx>
                  {`
                    .container {
                      display: flex;
                      width: 100vw;
                      height: 100vh;
                    }
                  `}
                </style>
                <style>
                  {`
                    * {
                      -ms-overflow-style: none;
                      scrollbar-width: none;
                    }
                    *::-webkit-scrollbar {
                        display: none;  // Safari and Chrome
                    }
                  `}
                </style>
              </div>
            )
          }
  }
}

export default view(DisplayPage)
