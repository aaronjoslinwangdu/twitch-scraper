require('dotenv').config();
const request = require('request');

var AT = '';  // Access token variable


// Function to get the token

const getToken = (url,callback) => {

    const options = {
        url: process.env.GET_TOKEN,
        json: true,
        body:{
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: 'client_credentials'
        }
    };

    request.post(options, (err,res,body) => {
        if(err) {
            return console.log(err);
        }
        console.log('Status: ${res.statusCode}');
        console.log(body);

        callback(res);
    });

};

getToken(process.env.GET_TOKEN,(res) => {
    AT = res.body.access_token;
    return AT;
});



// Function to get the top games on Twitch

const getGames = (url,accessToken,callback) => {

    const gameOptions = {
        url: process.env.GET_GAMES,
        method: 'GET',
        headers: {
            'Client-ID': process.env.CLIENT_ID,
            'Authorization': 'Bearer ' + accessToken,
        }
    }


    request.get(gameOptions, (err,res,body) => {

        if(err) {
            return console.log(err);
        }

        console.log('Status: ${res.statusCode}');
        console.log(JSON.parse(body));


    });
};




// Testing function

// Function to get the top 3 channels live on Twitch

const getTopThree = (url,accessToken,callback) => {

    const topThreeOptions = {
        url: process.env.GET_TOP_THREE,
        method: 'GET',
        headers: {
            'Client-ID': process.env.CLIENT_ID,
            'Authorization': 'Bearer ' + accessToken,
        }
    }


    request.get(topThreeOptions, (err,res,body) => {

        if(err) {
            return console.log(err);
        }

        console.log('Status: ${res.statusCode}');
        //console.log(JSON.parse(body));

        bodyParsed = JSON.parse(body);
        //console.log("Second largest channel's id is: " + bodyParsed['data'][1]['name']);
        firstChName = bodyParsed['data'][0]['user_name'];
        console.log("Largest Channel: " + firstChName);
        document.getElementById(candlestick).innerHTML = "Largest Channel: " + firstChName;


    });
};




// testing function
setTimeout(() => {
    
    /*getGames(process.env.GET_NAME,AT,(response) => {

    })*/
    
    getTopThree(process.env.GET_TOP_THREE,AT,(response) =>{
        console.log(JSON.parse(response));
    });

},1000)