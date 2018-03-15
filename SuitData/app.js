var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var starttimeInSecs = new Date().getTime() / 1000;
var max_battery_life = 36000;

var pressure = 0;
var oxygen = 0;
var elapsedtime = 0;
var battery_lifeSecs = 0;

function getHMS(seconds) {
    var date = new Date(null);
    date.setSeconds(seconds);
    var result = date.toISOString().substr(11, 8);
    return result;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRandomSuitData() {
    pressure = getRndInteger(1,10);
    oxygen   = getRndInteger(20,50);
    
    var nowInSecs = new Date().getTime() / 1000;
    var elapsedSecs = nowInSecs - starttimeInSecs;
    elapsedtime  = getHMS(elapsedSecs);
	battery_lifeSecs = max_battery_life - elapsedSecs;
    battery_life = getHMS(battery_lifeSecs);
    
    var data = '{';
    data = data +       '"pressure":"' + pressure + '"';
    data = data + ',' + '"oxygen":"'   + oxygen   + '"';
    data = data + ',' + '"time":"'     + elapsedtime  + '"';
    data = data + ',' + '"battery_life":"'  + battery_life  + '"';
    
    data = data + '}'
    return data;
}



/*
app.get('/api/telemetry/example', function(req, res){
	res.send('{ "_id" : ObjectId("5a8ed9a57eb95cd5d2855904"), "p_sub" : "3", "t_sub" : "75", "v_fan" : "20000", "t_eva" : "00:00:00", "p_o2" : "850", "rate_o2" : "0.75", "cap_battery" : "15", "p_h2o_g" : "15", "p_h2o_l" : "15", "p_sop" : "850", "rate_sop" : "0.75" }');
});*/

app.get('/api/telemetry/recent', function(req, res){
	var suitdata = getRandomSuitData()
	res.send(suitdata);
});

app.get('/api/switch/recent', function(req, res){
	res.send('{ "_id" : ObjectId("5a8edafa7eb95cd5d2855905"), "sop_on" : "false", "sspe" : "false", "fan_error" : "false", "vent_error" : "false", "vehicle_power" : "false", "h2o_off" : "false", "o2_off" : "false" }');
});

app.listen(80);
console.log('Running on port 80...')