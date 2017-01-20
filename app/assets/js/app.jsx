
const	React = require('react'),
			Carousel = require('./components/carousel.jsx'),  // Import Carousel component from ./components/carousel.jsx
			data = require('../../data/carousel.js'); // Import JSON data from app/data

class App extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<Carousel
							data={data}
							autoPlay={true}
							playSpeed={2500}
							loop={true}
							navigation={true}
							direction="left"
							caption={true}
							alignCaption="left"
							pagination={true}
						/>
					</div>
				</div>
			</div>
		)
	};
};

React.render(
	<App />,
	document.body
);
