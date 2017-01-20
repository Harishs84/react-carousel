
const React = require('react'),
		  Panel = require('./panel.jsx'),
		  Arrow = require('./arrow.jsx'),
      MeatBall = require('./meatball.jsx');

class Carousel extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	panelWidth: (typeof window !== undefined) ? window.outerWidth : null,	// Typeof to ensure component doesn't break in SSR.
	    activeIndex: 0
    };

    this._handlePrevClick = this._handlePrevClick.bind(this);
    this._handleNextClick = this._handleNextClick.bind(this);
    this._handleMeatBall = this._handleMeatBall.bind(this); // Should use Fat Arrow function to do Auto binding.
  }

	componentDidMount() {
		const { autoPlay } = this.props; // Destructing Assignments

		this.setState({
        panelWidth: (this.__container !== undefined) ? this.__container.getDOMNode().offsetWidth : null // getDomNode is deprecated. Use findDomNode instead in the latest React.
    });

    if(autoPlay){
        this._handleAutoPlay();
    }
	}

	// Custom functions starting with _underscore.
	_handleAutoPlay() {
		const { activeIndex } = this.state;
		const { data, loop, playSpeed } = this.props;
    const itemLength = data.items.length;

    this._timeouts = setInterval(() => {
      this.setState({
          activeIndex : (this.state.activeIndex + 1) % itemLength
      });

      if (!loop && activeIndex + 1 === itemLength - 1) {
          clearInterval(this._timeouts);
      }

  	}, playSpeed);

  };

  _handlePrevClick() {
  	const { activeIndex } = this.state;

  	const { data } = this.props;
  	let direction = ((activeIndex + data.items.length) - 1) % data.items.length;
    this._slideTraverse(direction);
  };

  _handleNextClick() {
  	const { activeIndex } = this.state;
  	const { data } = this.props;
  	let direction = (activeIndex + 1) % data.items.length;
    this._slideTraverse(direction);
  };

  _slideTraverse(direction) {
  	const { autoPlay } = this.props;
    this.setState({
      activeIndex: direction
    });

    if (autoPlay) {
      clearInterval(this._timeouts);
    }
	};

	_handleMeatBall(e) {
		const index = parseInt(e.target.id, 10) || 0;
		const { activeIndex, autoPlay } = this.props;
    if(index !== activeIndex) {
      this.setState({
        activeIndex : index
      });
    }
    if (autoPlay) {
      clearInterval(this._timeouts);
    }
  }

	render() {
		const { data, direction, loop, navigation, alignCaption, caption, pagination } = this.props; // Destructing Assignments
		const { panelWidth, activeIndex } = this.state;
		const totalSlides = data.items;
    const totalWidth = panelWidth * totalSlides.length;
    let positionLeft = -(panelWidth * activeIndex),
        positionRight = totalWidth - (panelWidth * (activeIndex + 1)),
        arrowObject = {
          loop: loop,
          activeIndex: activeIndex,
          length: totalSlides.length,
          navigation: navigation
        },
        styleObj = (direction === 'left') ? { panelWidth: totalWidth, marginLeft: positionLeft } : { panelWidth: totalWidth,  right: positionRight };

    return (
        <div>
            <div
              ref={div => {
                this.__container = this.__container || div;
                return this.__container;
              }}
              className="carousel-container"
              data-keyid="carousel-container-0"
              >
                <div className="carousel-wrapper">
                    <Panel
                    	slides={totalSlides}
                    	divObj={styleObj}
                    	caption={caption}
                    	alignCaption={alignCaption}
                    />
                </div>
                <Arrow
                	direction="left"
                	onClick={this._handlePrevClick}
                	arrowObject={arrowObject}
                />
                <Arrow
                	direction="right"
                	onClick={this._handleNextClick}
                	arrowObject={arrowObject}
                />
            </div>
            <MeatBall
            	items={totalSlides}
            	activeIndex={activeIndex}
            	pagination={pagination}
            	onClick={this._handleMeatBall}
            />
        </div>
      )

	}
};

Carousel.propTypes = {
	/**
  * Carousel Data from JSON
  */
	data: React.PropTypes.array.isrequired,
	/**
  * Carousel Auto play
  */
	autoPlay: React.PropTypes.bool,
	/**
  * Carousel play speed
  */
  playSpeed: React.PropTypes.number,
  /**
  * Continues play of carousel
  */
  loop: React.PropTypes.bool,
  /**
  * Play Left or Right direction of carousel
  */
  direction: React.PropTypes.string,
  /**
  * Show/hide Arrows
  */
  navigation: React.PropTypes.bool,
  /**
  * Show/hide caption
  */
  caption: React.PropTypes.bool,
  /**
  * Align Caption to left/right
  */
  alignCaption: React.PropTypes.oneOf(['left', 'right']),
  /**
  * Show/hide Pagination
  */
  pagination: React.PropTypes.bool
};

Carousel.defaultProps = {
  autoPlay: true,
  playSpeed: 2500,
  loop: true,
  navigation: true,
  direction: 'left',
  alignCaption: 'left',
  caption: false,
  pagination: false
};

module.exports = Carousel;
