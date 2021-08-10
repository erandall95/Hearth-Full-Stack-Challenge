import React from "react";

const { useEffect, useRef } = React;

/**
* Contains base URL for API, endpoint(s), and function that returns json response
* from post request
*/
export const API = {
   url: "http://localhost:3001",
   search: "/search",
   /**
    * 
    * @returns {string} string url of the search API endpoint
    */
   endpointSearch: ()=> {
       return API.url+API.search;
   },
   /**
    * API.post creates a post request to the specified API with the provided string data.\n
    * **DOES NOT have any error handling**
    * @param {string} endpoint 
    * @param {string} text 
    * @returns {object} json object of response
    */
   post: async (endpoint, text) => {
       return await fetch(endpoint, {
           method: 'POST',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               text: text,
           })
       })
       .then((response) => response.json())
       .then((json) => {
           // console.log(json);
           return json;
       })
   },
}

/**
 * @param {*} r 
 * @returns {array} an array of image urls
 */
export const importAll = (r) => {
	let images = {};
	r.keys().map((item, index) => { 
		images[item.replace('./', '')] = r(item); 
	});
	// console.log(images);
	let keys = Object.keys(images);
	// console.log(keys)
	let mapped = [];
	for(var i = 0; i < keys.length; i++) {
		mapped.push(images[keys[i]].default);
	}
	// console.log(mapped);
	return mapped;
}

/**
 * Creates an interval function the uses a callback every specified duration
 * @param {*} callback function to be called after every delay interval
 * @param {int} delay how long between calls in ms 
 */
export const  useInterval = (callback, delay) => {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      let id = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => clearInterval(id);
    }, [delay]);
  }