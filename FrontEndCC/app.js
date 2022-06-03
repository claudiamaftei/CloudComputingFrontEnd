var express = require('express');
var app = express();
var request = require('request');
 // for parsing application/json
app.use(express.json()); 

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.redirect('Movies');
});


app.get('/Movies', function(req, res){

  request({
    uri: 'https://x6r4spyl4xxpcbryr4x7vrlhvq0fnrwy.lambda-url.us-east-1.on.aws/',
    method: 'GET'
    }, function (error, response, body) {
      console.log(response.statusCode);
        if (!error && response.statusCode == 200) {
            res.render('MoviesList', {movies: JSON.parse(body)});
        }
        else{
            res.render('ErrorPage', {message:"Eroare la incarcarea filmelor", error:"true"})
        }
    }
  );
  
});


app.post('/SendNotification', function(req, res){

  console.log(req.body);
  request({
    uri: 'https://ueehgpqm5oydzqgc2doqpswnpa0xhgvh.lambda-url.us-east-1.on.aws/',
    method: 'POST',
    body: JSON.stringify(req.body)
    }, function (error, response, body) {
      console.log(response.statusCode);
        if (!error && response.statusCode == 200) {
            res.send('Succes');
        }
        else{
            res.send('Failed');
        }
    }
  );
  
});


app.get('/BuyForm', function(req, res){
  var movieName = req.query.nume;
  res.render("BuyForm", {movieName: movieName});
});


app.listen(3000, function () {
  console.log('App listening on port 3000!');
});