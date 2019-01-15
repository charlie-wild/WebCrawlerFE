import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
const fileDownload = require('js-file-download');

class Results extends Component {
	state = {
		BrokenLinks: [ 1, 2, 3, 4, 5, 6 ],
		LinkNumber: 20,
		BrokenLinkNumber: 8
	};
	render() {
		const { BrokenLinks, LinkNumber, BrokenLinkNumber } = this.state;
		const WorkingLinks = LinkNumber - BrokenLinkNumber;
		const data = {
			labels: [ 'Broken', 'Working' ],
			datasets: [
				{
					data: [ BrokenLinkNumber, WorkingLinks ],
					backgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ],
					hoverBackgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ]
				}
			]
		};
		return (
			<div className='resultsContainer'>
				<section className='resultsMain'>
					<section className='resultsHeader'>
						<h1>Results</h1>
						<h3>Visual Results Breakdown</h3>
						{fileDownload(BrokenLinks, 'filename.csv')}
						<Doughnut
							data={data}
							width={50}
							height={50}
							options={{
								maintainAspectRatio: false
							}}
						/>
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
