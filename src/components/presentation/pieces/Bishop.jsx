import React, {Component, PropTypes} from 'react';
import {DragSource} from 'react-dnd';
import {ItemTypes} from '../../../Constants.js';
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {...state};
};
const bishopSource = {
  beginDrag(props) {
    return {...props};
  },

  endDrag(props, monitor, component) {
    if (monitor.didDrop) {
      const store = component.store;
      const result = monitor.getDropResult();
      store.dispatch({
        type: 'MOVE_BISHOP',
        data: {
          position: [result.x, result.y],
          id: props.item.id
        }
      });
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class Bishop extends Component {

  componentDidMount() {
    const { connectDragPreview } = this.props;
    const img = new Image();
    img.src = this.props.item.color === 'black' ? 'http://localhost:8080/assets/bb.svg' : 'http://localhost:8080/assets/wb.svg';
    img.onload = () => connectDragPreview(img);
  }


  render() {
    const { connectDragSource, isDragging, connectDragPreview } = this.props;
    const black = this.props.item.color === 'black';
    return connectDragPreview(
      <div className="bishop" style={{backgroundColor: 'transparent'}}>
      {
        connectDragSource(
          <div style={{opacity: isDragging ? 0 : 1}}>
            <img src={'http://localhost:8080/assets/' + (black ? 'bb.svg' : 'wb.svg')}/>
          </div>)
      }
      </div>
    );
  }
}

Bishop.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

const BishopPiece = connect(
  mapStateToProps
)(Bishop);

export default DragSource(ItemTypes.BISHOP, bishopSource, collect)(BishopPiece);
