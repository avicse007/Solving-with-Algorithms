function delayedFunction(message) {
	let outerVariable = "I am from the outer scope.";
	let counter = 0;
	let timerId;

	function callback(timerId) {
		console.log("================START Logging=================");
		console.log("The timerId is ", timerId);
		console.log(message);
		console.log(outerVariable);
		outerVariable += ":: Counter:" + counter + " :: timerId:" + timerId;
		console.log("counter before increment", counter);
		counter++;
		console.log("counter After increment", counter);
		if (counter >= 10) {
			counter += 100;
		}
		if (counter >= 1000) {
			console.log("timerId is ", timerId);
			console.log("clearing timer");
			clearInterval(timerId);
		}
		console.log("================End Logging=================");
	}

	//timerId = setInterval(callback, 2000);
}

// Invoking the function with a message
delayedFunction("Hello, I am a delayed message!");
