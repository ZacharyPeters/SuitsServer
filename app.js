var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var starttimeInSecs = new Date().getTime() / 1000;
var max_battery_life = 36000;
var max_oxygen_life = 36000;
var max_water_life = 36000;

var p_int = 0; //psid
var p_sub = 0; //psia
var t_sub = 0; //degrees F
var v_fan = 0; //RPM
var p_o2 = 0; //psia
var rate_o2 = 0;  //psi/min
var cap_battery = 0; //amp-hr
var p_h2o_g = 0; //psia
var p_h2o_l = 0; //psia
var p_sop = 0; //psia
var rate_sop = 0; //psi/min

var t_eva = 0; 
var t_bat = 0;
var t_o2 = 0;
var t_h2o = 0;

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

    p_int = getRndInteger(2,4);
	p_sub = getRndInteger(2,4); 
	t_sub = getRndInteger(-250,250); 
	v_fan = getRndInteger(10000,40000);
    p_o2 = getRndInteger(750,950);
	rate_o2 = getRndInteger(0.5, 1);
	cap_battery = getRndInteger(0,30);
	p_h2o_g = getRndInteger(14,16);
	p_h2o_l = getRndInteger(14,16);
	p_sop = getRndInteger(750,950);
	rate_sop =  getRndInteger(0.5, 1);

    var nowInSecs = new Date().getTime() / 1000;
    var elapsedSecs = nowInSecs - starttimeInSecs;

    t_eva  = getHMS(elapsedSecs);

	battery_lifeSecs = max_battery_life - elapsedSecs;
    t_bat = getHMS(battery_lifeSecs);

	oxygen_lifesecs = max_oxygen_life - elapsedSecs*getRndInteger(1,5);
	t_o2 = getHMS(oxygen_lifesecs);

	water_lifesecs = max_water_life - elapsedSecs*getRndInteger(1,5);
	t_h2o = getHMS(water_lifesecs);

    var data = '{';
    /*data = data +       '"p_int":"'  + p_int + '"';
    data = data + ',' + '"Battery Life":"'            + t_bat + '"';
	data = data + ',' + '"Oxygen Life":"'             + t_o2  + '"';
	data = data + ',' + '"H2O Life":"'                + t_h2o + '"';*/
	data = data + '"p_sub":'               + p_sub;
	data = data + ',' + '"t_sub":'         + t_sub;
	data = data + ',' + '"v_fan":'         + v_fan;
	data = data + ',' + '"t_eva":"'         + t_eva + '"';
	data = data + ',' + '"p_o2":'          + p_o2;
	data = data + ',' + '"rate_o2":'       + rate_o2;
	data = data + ',' + '"cap_battery":'   + cap_battery;
	data = data + ',' + '"p_h2o_g":'       + p_h2o_g;
	data = data + ',' + '"p_h2o_l":'       + p_h2o_l;
	data = data + ',' + '"p_sop":'         + p_sop;
	data = data + ',' + '"rate_sop":'      + rate_sop;

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
	//res.send('{ "_id" : ObjectId("5a8edafa7eb95cd5d2855905"), "sop_on" : "false", "sspe" : "false", "fan_error" : "false", "vent_error" : "false", "vehicle_power" : "false", "h2o_off" : "false", "o2_off" : "false" }');
	res.send('{ "sop_on" : true, "sspe" : false, "fan_error" : false, "vent_error" : false, "vehicle_power" : false, "h2o_off" : false, "o2_off" : false }');

});




app.listen(80);
console.log('Running on port 80...')