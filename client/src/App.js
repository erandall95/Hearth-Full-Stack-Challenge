import React from "react";
import Form from "react-bootstrap/Form"

import { API, importAll, useInterval } from "./helperFunc"
import { makeAutoCompeleteListGroup } from "./cardGrouper"

const { useState } = React;
/**
 * The time (in milliseconds) that the background slide changes
 */
const SLIDE_BACKGROUND_TIME_DELTA = 8000;

/**
 * All the background images to display
 */
const backgroundImages = importAll(require.context('./background_images', false, /\.(png|jpe?g|svg)$/));

function App() {
	const [backgroundSlideIndex, setBackgroundSlideIndex] = useState(0);
	const [input, setInput] = useState("");
	const [autoCompleteList, setAutoCompleteList] = useState([]);

	/**
	 * Change the background image every SLIDE_BACKGROUND_TIME_DELTA ms
	 */
	useInterval(() => {
		if(backgroundSlideIndex > backgroundImages.length) {
			setBackgroundSlideIndex(0);
		} else {
			setBackgroundSlideIndex(backgroundSlideIndex+1);
		}
	}, SLIDE_BACKGROUND_TIME_DELTA);

	/**
	 * Fetches any and all address matches on the server when the input changes
	 * @param {object} event fired by an input change to the input text box.
	 */
	const inputChangeHandler = (event) => {
		setInput(event.target.value);
		//send the input text to the server and get matching addresses back
		API.post(API.endpointSearch(), event.target.value)
		.then((res) => {
			//make the groupings of result cards
			makeAutoCompeleteListGroup(res)
			.then((ret)=>{
				//update the display with the new cards
				setAutoCompleteList(ret);
			})
		});
	}
	
	const topStyle = {
		height: '100vh', 
		overflow:'hidden',
	}

	const imageStyle = {
		objectFit: 'fill',
	}

	const formListStyle = {
		overflow:'hidden', 
		height: '100vh', 
		width: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
	}

	const formDivStyle = {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		marginTop: '1%',
		marginBottom: '1%',
		height: '10%',
	}

	const formControlStyle = {
		color: "rgba(255, 255, 255, 1)",
		textAlign: "center",
		fontSize: "36px",
		backgroundColor: "rgba(21, 21, 21, 0.75)",
		borderWidth: "2px",
		borderRadius: "20px",
		borderColor: "#000000",
		width: '30%',
		height: '100px'
	}

	const autoCompleteListStyle = {
		display: 'flex', 
		flexDirection: 'column',
		height: '90%',
		overflow: 'scroll',
	}

	return (
		<div style={topStyle}>
			{/* hacky background slides. It'd be much nicer if I faded between images */}
			<img src={backgroundImages[backgroundSlideIndex]} 
				style={imageStyle}>
			</img>

			<div style={formListStyle}>

				<div style={formDivStyle}>
					<Form.Control
						type="text" 
						placeholder="search address" 
						value={input} 
						onChange={inputChangeHandler}
						style={formControlStyle}
					/>
				</div>

				<div style={autoCompleteListStyle}>
					{autoCompleteList}
				</div>
		
			</div>
		
		</div>
	)
}

export default App;