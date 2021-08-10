import AutoCard from "./AutoCard";

/**
 * Creates a layout of card components containing all relevant search information
 * @param {array} results array of listing results to be displayed to the viewer 
 */
export const makeAutoCompeleteListGroup = async (results) => {

    /**
     * Puts any information of interst in an easily accessible object
     * @param {*} name name of the data of interest
     * @param {*} dataIndex index of the data of interest
     * @returns {object} ioi object containing information of interest
     */
    const ioi = (name, dataIndex) => {
        return {name: name, dataIndex: dataIndex};
    }

    const cardGroupStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: '2%'
    }

    /**
     * Number of card columns to display
     */
    const cardsPerGroup = 3;
    const ADDRESS = results.header.indexOf("ADDRESS");
    const URL = results.header.indexOf("URL (SEE http://www.redfin.com/buy-a-home/comparative-market-analysis FOR INFO ON PRICING)");
    const ioiArray = [
        // ioi("ADDRESS", results.header.indexOf("ADDRESS")),
        ioi("PROPERTY TYPE", results.header.indexOf("PROPERTY TYPE")),
        ioi("POSTAL CODE", results.header.indexOf("ZIP OR POSTAL CODE")),
        ioi("PRICE", results.header.indexOf("PRICE")),
        ioi("BEDS", results.header.indexOf("BEDS")),
        ioi("BATHS", results.header.indexOf("BATHS")),
        ioi("LOCATION", results.header.indexOf("LOCATION")),
        ioi("SQUARE FEET", results.header.indexOf("SQUARE FEET")),
        ioi("LOT SIZE", results.header.indexOf("LOT SIZE")),
        ioi("YEAR BUILT", results.header.indexOf("YEAR BUILT")),
        ioi("DAYS ON MARKET", results.header.indexOf("DAYS ON MARKET")),
        ioi("HOA MONTH", results.header.indexOf("HOA/MONTH")),
        ioi("NEXT OPEN HOUSE START TIME", results.header.indexOf("NEXT OPEN HOUSE START TIME")),
    ];

    //make all cards and card groups
    let list = [];
    for(let i = 0, k = 0; i < results.addresses.length; i+=cardsPerGroup, k++) {
        //make a card group
        let group = [];
        for(let j = 0; j < cardsPerGroup; j++) {
            //if there is a viable result, display it
            if(results.addresses[i+j]) {
                group[j] = <AutoCard 
                                key={i+j} 
                                name={i+j} 
                                address={results.addresses[i+j][ADDRESS]} 
                                data={results.addresses[i+j]} 
                                ioiArray={ioiArray} 
                                url={results.addresses[i+j][URL]}/>
            }
        }
        //store the card group
        list[k] = (
            <div key={k} 
                style={cardGroupStyle}>
                {group}
            </div>
        )
    }
    //set the state of the displayed cards
    return list;
}