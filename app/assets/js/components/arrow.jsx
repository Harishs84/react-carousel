
const React = require('react'),
  Icon = require('./icon.jsx'),
  Arrow = React.createClass({

    _displayArrows() {
      const { direction, arrowObject, onClick } = this.props;
      const { activeIndex, loop, navigation, length } = arrowObject; // Further breaking down the assignments

      if(navigation) {
          if(direction === 'left') {
              if(loop || !!activeIndex) {
                return (<a
                  className="prev"
                  onClick={onClick}
                >
                  <Icon type="left" />
                </a>)
              }

          } else {
              if(loop || (activeIndex !== length -1)) {
                return (<a
                  className="next"
                  onClick={onClick}
                >
                  <Icon type="right" />
                </a>)
              }
          }
      }
    },

    render() {
        return <div>
                {this._displayArrows()}
            </div>
    }
});

Arrow.propTypes = {
  /**
  * Direction of the Carousel
  */
  direction: React.PropTypes.oneOf(['left', 'right']),
  /**
  * Arrow Objects for Container
  */
  arrowObj: React.PropTypes.object,
  /**
  * Arrow Click Function
  */
  onClick: React.PropTypes.func
}

module.exports = Arrow;
