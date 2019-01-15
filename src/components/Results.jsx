import React, { Component } from 'react';

class Results extends Component {
	state = {
		BrokenLinks: [ 'hello', 'hi', 'by', 'yes', 'no' ],
		LinkNumber: 20,
		BrokenLinkNumber: 14
	};
	render() {
		const { BrokenLinks, LinkNumber, BrokenLinkNumber } = this.state;
		return (
			<div className='resultsContainer'>
				<section className='resultsMain'>
					<section className='resultsHeader'>
						<h1>Results</h1>
						<h3>Visual Results Breakdown</h3>
						<p id='allLinks'>
							<label htmlFor='allLinks' className='authFormLabel'>
								All Links:
							</label>
							{LinkNumber}
						</p>
						<p id='allLinks'>
							<label htmlFor='allLinks' className='authFormLabel'>
								All Links:
							</label>
							{BrokenLinkNumber}
						</p>
					</section>
					<section>
						<h3>Individual Links</h3>
						{BrokenLinks.map((link) => {
							return <li key={link}>{link}</li>;
						})}
					</section>
				</section>
			</div>
		);
	}
}

export default Results;
