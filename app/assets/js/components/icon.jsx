
const React = require('react'),
    Icon = React.createClass({

      render() {
        const { type } = this.props;
        const text = (type === "left") ? 'keyboard_arrow_left' : 'keyboard_arrow_right';

        return (
          <i className="material-icons md-icon">{text}</i>
        )
      }
});

Icon.propTypes = {
  /**
  * Direction of the Arrows Icons
  */
  type: React.PropTypes.oneOf(['left', 'right'])
}

module.exports = Icon;
