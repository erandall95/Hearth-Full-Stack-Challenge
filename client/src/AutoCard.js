import React from "react";
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'

const { useState } = React;

const MakeCard = (props) => {
	const [isHover, setIsHover] = useState(false);
	
	/**
	 * Opens the provided url in a new tab
	 * @param {string} url url to open in a new browser tab
	 */
	const openInNewTab = (url) => {
		const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
		if (newWindow) newWindow.opener = null
	}

	let cardStyleDefault = {
		marginTop: '2%',
		marginLeft: '1%',
		marginRight: '1%',
		width: '30%',
		height: '90%',
		backgroundColor: 'rgba(21, 21, 21, 0.75)',
		borderRadius: '20px'
	}

	let cardStyleHover = {
		marginTop: '2%',
		marginLeft: '1%',
		marginRight: '1%',
		width: '30%',
		height: '90%',
		backgroundColor: 'rgba(75, 75, 75, 0.75)',
		borderRadius: '20px'
	}

	let cardTitleStyle = {
		marginTop: '5%',
		marginLeft: '5%',
		marginBottom: '5%',
		fontWeight: 'bolder',
		color: 'rgba(255, 255, 255, 1)',
		textAlign: 'center',
	}

	let cardTableStyle = {
		marginLeft: '5%',
		marginBottom: '2%',
	}

	let cardTableRowStyle = {
		marginRight: '5em',
		color: 'rgba(255, 255, 255, 1)',
	}

	let cardTableDataStyle = {
		textAlign: 'left',
	}

	return (
		// return a card component with some hacky hover effect
		<Card border='dark' 
			key={props.name}
			style={isHover?cardStyleHover:cardStyleDefault}
			onMouseEnter={()=>{setIsHover(true)}}
			onMouseLeave={()=>{setIsHover(false)}}
			onClick={()=>{openInNewTab(props.url)}}
		>
			<Card.Body>
				<Card.Title style={cardTitleStyle}>{props.address}</Card.Title>
				<Table style = {cardTableStyle}>
					<tbody>
						{/* map all data of interest to the table */}
						{props.ioiArray.map((_, k) => (
							<tr key={"r"+k} style={cardTableRowStyle}>
								<td key={"t"+k} style={cardTableDataStyle}>
									{props.ioiArray[k].name+": "}
								</td>
								<td key={"d"+k}>
									{props.data[props.ioiArray[k].dataIndex]}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Card.Body>
		</Card>
	)
}

export default MakeCard