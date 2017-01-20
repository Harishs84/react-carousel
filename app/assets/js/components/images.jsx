
const React = require('react'),
    Images = React.createClass({

      render() {
        const { slide } = this.props;

        return (
          <img src={slide.img} alt={slide.caption} />
        )
      }
});

Images.propTypes = {
  /**
  * Data of Images
  */
  Slide: React.PropTypes.array
}

module.exports = Images;
