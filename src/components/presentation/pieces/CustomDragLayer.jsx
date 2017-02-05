
import React, { Component, PropTypes } from 'react';
import { DragLayer } from 'react-dnd';
import PieceDragPreview from './PieceDragPreview';

export default class CustomDragLayer extends Component {
  static propTypes = {
    item: PropTypes.object,
    isDragging: PropTypes.bool.isRequired,
  };

  renderItem(type, item) {
    switch (type) {
      case ItemTypes.BOX:
        return (<PieceDragPreview item={item} />);
      default:
        return null;
    }
  }

  render() {
    const { item, itemType, isDragging } = this.props;

    if (!isDragging) {
      return null;
    }

    return (
      <div >
        <div>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    );
  }
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    isDragging: monitor.isDragging()
  };
}

export default DragLayer(collect)(CustomDragLayer)
