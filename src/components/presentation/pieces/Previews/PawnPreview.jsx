import React, {Component} from 'react';
import {DragLayer} from 'react-dnd';

export class PawnPreview extends Component {

  render() {
    return (
      <div style={{backgroundColor: 'none'}}>
        <img src="http://localhost:8080/assets/wp.svg" alt="Pawn"/>
      </div>
    )
  }
}
