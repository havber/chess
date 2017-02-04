import React from 'react';
import Square from './Square.jsx';
import {DragDropContext} from 'react-dnd';
import HTMLBackend from 'react-dnd-html5-backend';

class Board extends React.Component {

  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const cls = (x + y) % 2 === 1 ? 'dark' : 'light';

    return (
      <div key={i} className={'square ' + cls} style={{ width: '12.5%', height: '12.5%' }}>
        <Square className={cls} x={x} y={y} isOver={false}/>
      </div>
    )
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i ++) {
      squares.push(this.renderSquare(i));
    }
    return (<div className="board">{squares}</div>);
  }
}

export default DragDropContext(HTMLBackend)(Board);