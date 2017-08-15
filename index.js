function flyby(lat, lon){
	var url = "https://api.nasa.gov/planetary/earth/assets";
	context = {
		"lon" : lon,
		"lat" : lat,
		"begin" : "2007-01-01",
		"api_key" : "DEMO_KEY"
	};
	// HTTP Get request to NASA servers
	$.get(url, context, function(data, status){
		nextTime(data, status);
	});
}

function nextTime(data, status){
	if(status=="success"){
		console.log("Data Received");
		count = data.count; // number of results received
		results = data.results; // array of results

		if(count > 1){
			// sorting the array of dates to get the latest date in the end
			results.sort(function(a,b){return Date.parse(a.date) - Date.parse(b.date)});
			time_delta = 0;

			// date and time in milli-seconds
			prev_date = Date.parse(results[0].date);
			for (i=1; i<count; i++) {
				this_Date = Date.parse(results[i].date);
				// adding all the differences in dates
				time_delta += Math.abs(this_Date - prev_date); 
				prev_date = this_Date;
			}

			// average difference for (count-1) differences
			avg_time_delta = Math.ceil(time_delta/(count-1));
			last_date = results[count-1].date;
			console.log("Last Date : "+ new Date(last_date));
			console.log("Next Date : "+ new Date(Date.parse(last_date)+avg_time_delta));
		}
		else{
			console.log("Insufficient Data");
		}
	} else {
		console.log("Status Returned: "+ status);
	}
}

function main(){
	console.log("Grand Canyon");
	flyby(36.098592,-112.097796);
	console.log("Niagara Falls");
	flyby(43.078154,-79.075891);
	console.log("Four Corners Monument");
	flyby(36.998979,-109.045183);
	console.log("Medsender HQ");
	flyby(40.720583,-74.001472);
}






