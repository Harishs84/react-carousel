
const React = require('react'),
     MeatBall = React.createClass({

    _displayPagination() {
      const { items, activeIndex, pagination, onClick } = this.props;

      if(pagination) {
        return (
          <ul className="paginations">
            {items.map((items, index) => {
                return (
                  <li
                      id={index}
                      key={index}
                      className={(index === activeIndex) ? "pagination-item active": "pagination-item" }
                      onClick={onClick}
                  ></li>
                );
            })}
        </ul>
        )
      }
    },

    render() {
        return (<div>
                  {this._displayPagination()}
                </div>
        )
    }
});

MeatBall.propTypes = {
  /**
  * Active Index
  */
  activeIndex: React.PropTypes.number,
  /**
  * Show/hide Pagination
  */
  pagination: React.PropTypes.bool,
  /**
  * Pagination Click Function
  */
  onClick: React.PropTypes.func
}

module.exports = MeatBall;
