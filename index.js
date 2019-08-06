'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion, Image } = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const _agent = new WebhookClient({ request: request, response: response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    const welcome = (agent) => {
        agent.add(`Welcome from webhook`);
    }

    const fallback = (agent) => {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }


    const showCard = (agent) => {
        agent.add(`This message is from Dialogflow's Cloud Functions for Firebase inline editor!`);
        agent.add(new Card({
            title: `Title: this is a card title`,
            imageUrl: 'https://dialogflow.com/images/api_home_laptop.svg',
            text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
            buttonText: 'This is a button',
            buttonUrl: 'https://docs.dialogflow.com/'
        })
        );
    }


    const showImage = (agent) => {
        agent.add(new Image('https://i.imgur.com/DYLlv4G.gif'));
    }



    const showSuggestion = (agent) => {

        agent.add(`Would you like to understand how I may be of use to you? Please say Yes or No`);
        agent.add(new Suggestion(`Yes`));
        agent.add(new Suggestion(`No`));
    }


    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('show card', showCard);
    intentMap.set('show Image', showImage);
    intentMap.set('show Suggestion', showSuggestion);
    _agent.handleRequest(intentMap);
});