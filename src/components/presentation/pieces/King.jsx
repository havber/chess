import React, {Component, PropTypes} from 'react';
import {DragSource} from 'react-dnd';
import {ItemTypes} from '../../../Constants.js';
import {connect} from "react-redux";
import {getEmptyImage} from "react-dnd-html5-backend";

const mapStateToProps = (state) => {
  return {...state};
};
const kingSource = {
  beginDrag(props) {
    return {...props};
  },

  endDrag(props, monitor, component) {
    if (monitor.didDrop) {
      const store = component.store;
      const result = monitor.getDropResult();
      store.dispatch({
        type: 'MOVE_KING',
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

class King extends Component {

  componentDidMount() {
    const { connectDragPreview } = this.props;
    connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }


  render() {
    const { connectDragSource, isDragging, connectDragPreview } = this.props;
    const black = this.props.item.color === 'black';
    return connectDragPreview(
      <div className="king" style={{backgroundColor: 'transparent'}}>
      {
        connectDragSource(
          <div style={{opacity: isDragging ? 0 : 1}}>
            <img src={'http://localhost:8080/assets/' + (black ? 'bk.svg' : 'wk.svg')}/>
          </div>)
      }
      </div>
    );
  }
}

King.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

const KingPiece = connect(
  mapStateToProps
)(King);

export default DragSource(ItemTypes.KING, kingSource, collect)(KingPiece);
