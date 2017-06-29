var events = require('events');
var EventEmitter = events.EventEmitter; 

var stockTicker = new EventEmitter(); 
let companies = ['aapl', 'goog', 'tsla'];

setInterval(() => {
	stockTicker.emit('newRating',{
		company: companies[Math.floor(Math.random() * 3)],
		price: 1000 * Math.random()
	});
}, 500);


stockTicker.on('newRating', function(info){
	console.log(`Stock Name: ${info.company} Stock Price: ${info.price}`); 
})