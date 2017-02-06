import {DragLayer} from 'react-dnd';
import React, {PropTypes, Component} from 'react';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '12vw',
  height: '12vw',
};

function getImageUrl(item) {
  switch(item.type) {
    case 'pawn':
      return item.color === 'black' ? 'bp.svg' : 'wp.svg';
    case 'knight':
      return item.color === 'black' ? 'bn.svg' : 'wn.svg';
    case 'bishop':
      return item.color === 'black' ? 'bb.svg' : 'wb.svg';
    case 'rook':
      return item.color === 'black' ? 'br.svg' : 'wr.svg';
    case 'queen':
      return item.color === 'black' ? 'bq.svg' : 'wq.svg';
    case 'king':
      return item.color === 'black' ? 'bk.svg' : 'wk.svg';
  }
}

function getItemStyles(props) {

  const {currentOffset, item} = props;
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    backgroundImage: 'url(http://localhost:8080/assets/' + getImageUrl(item.item) + ')',
    backgroundRepeat: 'no-repeat',
    width: '85%',
    height: '85%',
    backgroundSize: '100% 100%',
    transform: transform,
  }
}

class CustomDragLayer extends Component {

  render() {
    const {isDragging, item} = this.props;
    if (!isDragging) {
      return null;
    }
    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
        </div>
      </div>
    )
  }
}

CustomDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  isDragging: PropTypes.bool.isRequired
};

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  };
}

export default DragLayer(collect)(CustomDragLayer);
