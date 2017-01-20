
const React = require('react'),
      classnames = require('classnames'),
      Images = require('./images.jsx')

  Panel = React.createClass({ // Stateless components are much eaiser to define using constant with arrow function

  _displayCaption(slide) {
    const { caption, alignCaption } = this.props;

    if(caption) {
      return(
        <div className="caption">
          <p className={classnames('caption-text', `caption-text-${alignCaption}`)}>{slide.caption}</p>
        </div>
      )
    }
  },

  _displayPanel(divObj, slides) {
    return (
      <div className="carousel-list" style={divObj}>
        {
          slides.map((slide, index) => {
            return (
              <div key={index} className="carousel-item">
                <Images slide={slide} />
                {this._displayCaption(slide)}
              </div>
            )}
          )
        }
      </div>
    );
  },

  render() {
    const { divObj, slides, alignCaption, caption } = this.props; // Destructing Assignments

    return <div>{this._displayPanel(divObj, slides)}</div>
  }
});

Panel.propTypes = {
  /**
  * Show/hide Caption
  */
  caption: React.PropTypes.bool,
  /**
  * Align Caption to left/right
  */
  alignCaption: React.PropTypes.oneOf(['left', 'right']),
  /**
  * Style Objects for Container
  */
  divObj: React.PropTypes.object
}

module.exports = Panel;
