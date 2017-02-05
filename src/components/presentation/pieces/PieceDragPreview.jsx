import React, {Component} from 'react';
import Pawn from './Pawn.jsx'

export default class PieceDragPeview extends Component {

  render() {
    return (
      <Pawn item={{id:1, type:'pawn', color: 'white', position: [1,6]}}/>
    )
  }
}
