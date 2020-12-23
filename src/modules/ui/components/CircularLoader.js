import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

export class CircularLoader extends Component {
  static propTypes = {
    // Type
    type: PropTypes.string,
    // Label
    color: PropTypes.string,
  };

  static defaultProps = {
    type: 'Oval',
    color:"#FB961D",
    height:100,
    width:100
  };

  render() {
    const { type, color, height, width } = this.props;

    return (
    <div className="text-center m--margin-20">
      <Loader
        type={type}
        color={color}
        height={height}
        width={width}
      />
    </div>
    );
  }
}

