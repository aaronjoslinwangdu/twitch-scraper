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

        bodyParsed = JSON.parse(body);
        firstChName = bodyParsed['data'][0]['user_name'];
        console.log("Largest Channel: " + firstChName);
        


    });
};



// function to get top clip from league after a certain date in .env file

const getLolClips = (url,accessToken,callback) => {

    const lolClipsOptions = {
        url: process.env.GET_LOL_CLIPS,
        method: 'GET',
        headers: {
            'Client-ID': process.env.CLIENT_ID,
            'Authorization': 'Bearer ' + accessToken,
        }
    }

    request.get(lolClipsOptions, (err,res,body) => {

        if(err) {
            return console.log(err);
        }

        bodyParsed = JSON.parse(body);
        topClipUrl = bodyParsed['data'][0]['url'];
        console.log(topClipUrl);


    });
};



// get top 3 tyler1 clips from date specified in env

const getTylerClips = (url,accessToken,callback) => {

    const tylerClipsOptions = {
        url: process.env.GET_TYLER_CLIPS,
        method: 'GET',
        headers: {
            'Client-ID': process.env.CLIENT_ID,
            'Authorization': 'Bearer ' + accessToken,
        }
    }

    request.get(tylerClipsOptions, (err,res,body) => {

        if(err) {
            return console.log(err);
        }

        bodyParsed = JSON.parse(body);
        
        for (var i = 0; i < 3; i++) {
            clipUrl = bodyParsed['data'][i]['url'];
            console.log("Clip " + i + ": " + clipUrl);
        }
        
    });
};


// ------------------------------------------------------------------------------------------------- //



// runs getToken to get and set our access token variable
getToken(process.env.GET_TOKEN,(res) => {
    AT = res.body.access_token;
    return AT;
});


// testing function
var topClipUrl = '';

setTimeout(() => {
    
    getTylerClips(process.env.GET_TYLER_CLIPS,AT,(res) =>{
        
    });

},1000)
