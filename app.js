var http = require("http"),
	mongoose = require("mongoose");


// IP, PORT setup
const PORT = process.env.PORT || 1337;
const IP = process.env.IP || "0.0.0.0";
const DB = process.env.DB || "mongodb://localhost/pincodes";


// MONGOOSE setup
// ==========
 
mongoose.connect(DB);
var pinSchema = mongoose.Schema({
	city: String,
	state: String,
	pincode: String,
	district: String
});
var Pin = mongoose.model("postal_codes", pinSchema);






// CONSTRUCTORS
// ==========

/*
 * JsonErr Contructor.
 */
var JsonErr = function(err) {
	this.err = err;	
	this.struct = { "Response":"False", "Error": err }
};

JsonErr.prototype.throw = function() {
	return JSON.stringify(this.struct);
};


/*
 * ReqUrl Constructor.
 */
var RegUrl = function(url, reg) {
	this.url = url;
	this.reg = reg;
	this.matches = [];
};

RegUrl.prototype.regMatch = function() {
	re = new RegExp(this.reg),
	this.matches = this.url.match(re);
	if (this.matches === null) return false;
	return true;
};




// FUNCTIONS
// ==========

/*
 * This function deals with the requests and responses 
 * from clients.
 */
var server = function(req, res) {
	switch (req.url) {

		/*
		 * Root Route.
		 */
		case "/":
			res.writeHead(200, { "Content-Type": "application/json" });
			var appData = {
				greetings: "Thanks for using Indian Postal Codes API",
				author: "Ramachandra Jr",
				website: "http://ramachandrajr.github.io"
			};
			res.end(JSON.stringify(appData));
			break;

		/*
		 * All API routes.
		 */
		default:
			var url = new RegUrl(req.url, "^\/pincode\/(\\d\{6\})$");
			
			res.writeHead(200, { "Content-Type": "application/json" });

			// If regex is fine get the API
			if (url.regMatch()) {
				Pin.findOne({pincode: url.matches[1]}, function(err, foundData) {
					if (err || foundData === null) res.end(new JsonErr("No such postal code in database").throw());
					res.end(JSON.stringify(foundData));
				});
			}
			// else write an error to the page
			else {
				res.end(new JsonErr("Please use a proper route!").throw());
			}

	}
};




// FUNCTIONAL PROGRAM
// ==========

var app = http.createServer(server);
app.listen(PORT, IP, function() {
	console.log("Server has Started!");
});