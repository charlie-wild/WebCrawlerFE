import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import './results.css';
const fileDownload = require('js-file-download');

class Results extends Component {
	state = {
		BrokenLinks: [ 'hello', 'is', 'it', 'me', 'you', 'are', 'looking', 'for' ],
		LinkNumber: 20,
		BrokenLinkNumber: 8
	};
	render() {
		const { BrokenLinks, LinkNumber, BrokenLinkNumber } = this.state;
		const WorkingLinks = LinkNumber - BrokenLinkNumber;
		const donutVal = BrokenLinkNumber / LinkNumber * 100;
		const data = {
			labels: [ 'Broken', 'Working' ],
			datasets: [
				{
					data: [ BrokenLinkNumber, WorkingLinks ],
					backgroundColor: [ '#FF6384', '#36A2EB' ],
					hoverBackgroundColor: [ '#FF6384', '#36A2EB' ]
				}
			]
		};
		return (
			<div className='resultsContainer'>
				<section className='resultsMain'>
					<section className='resultsHeader'>
						<h1>Results</h1>
						<h4>Visual Results Breakdown</h4>
						<p id='allLinks'>
							<label htmlFor='allLinks' className='authFormLabel'>
								All Links:
							</label>
							{` ${LinkNumber}`}
						</p>
						<p id='allLinks'>
							<label htmlFor='allLinks' className='authFormLabel'>
								Broken Links:
							</label>
							{` ${BrokenLinkNumber}`}
						</p>
						{/* {fileDownload(BrokenLinks, 'BrokenLinks.csv')} */}
						<p>{`${donutVal}% of the links are broken`}</p>
						<section className='chart'>
							<Doughnut
								data={data}
								options={{
									maintainAspectRatio: false
								}}
							/>
						</section>
					</section>
					<section>
						<h4>List of Broken Links</h4>
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
