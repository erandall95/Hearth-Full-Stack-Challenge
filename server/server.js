const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const rdr = require("readline");

/**
 * DATA_FILE_PATH is the pre-sorted (by address) CSV file of the redfin data
 */
const DATA_FILE_PATH = "./data_sorted.csv";
const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

/**
 * array holding the CSV data
 */
var appData = [];
/**
 * array holding table headers
 */
var headerData;

/**
 * searchBinaryAddress returns an array of partial address matches from provided needle and haystack
 * @param {string} needle the value to be found
 * @param {array} haystack the array to be searched
 * @param {boolean} addressOnly true returns array of only matched addresses, false returns all data from matched address
 * @returns {array} contains all partial matches to needle search
 */ 
var searchBinaryAddress = function(needle, haystack, addressOnly) {
	if(needle == "") return [];
	var addressIndex 	= headerData.indexOf("ADDRESS");
	var haystackLength 	= haystack.length;
	var letterNumber 	= needle.length;
	needle 				= needle.toLowerCase();
		
	/* start binary search, Get middle position */
	var getElementPosition = findElement()
	/* get interval and return result array */
	if(getElementPosition == -1) return [];
	return findRangeElement()
	
	/**
	 * @returns {int}  middle position, else -1 if not found
	 */
	function findElement() {
		if (typeof(haystack) === 'undefined' || !haystackLength || addressIndex === -1) {
			console.log("Invalid Address search");
			return -1;
		}
		var high = haystack.length - 1;
		var low = 0;
		while (low <= high) {
			mid = parseInt((low + high) / 2);
			var element = haystack[mid][addressIndex].substring(0, letterNumber);
			element = element.toLowerCase();
			if (element > needle) {
				high = mid - 1;
			} else if (element < needle) {
				low = mid + 1;
			} else {
				return mid;
			}
		}
		console.log(`No result for: (${needle})`);
		return -1;
	}

	/**
	 * @returns {array} an array of partial matches
	 */
	function findRangeElement() {
		//get the start range position
		for(i=getElementPosition; i>0; i--) {
			var element = haystack[i][addressIndex].substr(0, letterNumber).toLowerCase();
			if(element != needle){
				var start = i+1;
				break;
			} else {
				var start = 0;
			}
		}
		//get the end range position
		for(i=getElementPosition; i<haystackLength; i++ ) {
			var element = haystack[i][addressIndex].substr(0, letterNumber).toLowerCase();
			if(element != needle){
				var end = i;
				break;
			} else {
				var end = haystackLength -1;
			}
		}
		//store start to end in a resultant array
		var result = [];
		if(addressOnly) {
			for(i=start; i<end;i++){
				result.push(haystack[i][addressIndex])
			}
		} else {
			for(i=start; i<end;i++){
				result.push(haystack[i])
			}
		}
		return result;
	}
	
};

/**
 * loadData (called on startup and on data file change event by File System) stores the data in the "appData" and "headerData" variables.
 * @param {object} event not used
 * @param {string} filename not used
 */
function loadData(event, filename) {
	//Read in the file (can be read in line by line, or as a single string and then split)
	//read line by line
	//update appData (can reset appData, or only affect changes)
	
	// appData = fs.readFileSync(DATA_FILE_PATH, "utf8");
	// appData = appData.split("\r\n");
	// for(let i = 0; i < appData.length; i++) {
	// 	appData[i] = appData[i].split(",");
	// }

	var stream = fs.createReadStream(DATA_FILE_PATH);
	var reader = rdr.createInterface({input:stream});

	var i = 0;
	reader.on("line", (row) => {
		if(i == 0) {
			headerData = row.split(",");
		} else {
			//i-1 to account for that header row
			appData[i-1] = row.split(",");
		}
		i++;
	});
	reader.on("close", () => {
		//TBD
	})
}

console.log("\033c"); //ansi escape code to clear the console
fs.watchFile(DATA_FILE_PATH, loadData);
loadData(null, null);

/*
	two end-points:
	1. Text completion - should complete whatever is in text box with closest available
	2. Result information from csv --could be multiple results--
*/

/**
 * Result informaiton for complete search - will also return list if partial matches occur
 */
app.post("/search", (req, res) => {
	// console.log(`Search Data: (${req.body.text})`);
	let addresses = searchBinaryAddress(req.body.text, appData, false);
	res.json({ header: headerData, addresses: addresses });
});

/**
 * Returns list of partial string matches from appData
 */
app.post("/complete", (req, res) => {
	// console.log(`Text to complete: (${req.body.text})`);
	//return the header row with results
	let addresses = searchBinaryAddress(req.body.text, appData, true);
	res.json({ addresses: addresses });
});

/**
 * Start listening for requests on the chosen port
 */
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});