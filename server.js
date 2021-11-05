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

const getAsd = (url,accessToken,callback) => {

    const asdOptions = {
        url: process.env.GET_T1_ID,
        method: 'GET',
        headers: {
            'Client-ID': process.env.CLIENT_ID,
            'Authorization': 'Bearer ' + accessToken,
        }
    }


    request.get(asdOptions, (err,res,body) => {

        if(err) {
            return console.log(err);
        }

        console.log('Status: ${res.statusCode}');
        console.log(JSON.parse(body));
        
       
       



    });
};




// testing function
setTimeout(() => {
    
    getAsd(process.env.GET_T1_ID,AT,(response) =>{
        console.log()
    })

},1000)