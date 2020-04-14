'use strict';
var path = require('path');

// set up
const express = require('express');
const { Server } = require('ws');
const { execute } = require('apollo-link');
const { WebSocketLink } = require('apollo-link-ws');
const { SubscriptionClient } = require('subscriptions-transport-ws');
const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';
const ws1=require('ws');

const getWsClient = function(wsurl) {
  const client = new SubscriptionClient(
    wsurl, {reconnect: true}, ws1
  );
  return client;
};

const createSubscriptionObservable = (wsurl, query, variables) => {
  const link = new WebSocketLink(getWsClient(wsurl));
  return execute(link, {query: query, variables: variables});
};

const gql = require('graphql-tag');

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

const SUBSCRIBE_QUERY = gql  `
subscription MyContacts {
  mycontacts {
    firstname
    createddate
    lastname
    mobilephone
    preference__c
    sfid
    size__c
    title
    accountid
    email
    _hc_lastop
  }
}
`;

const subscriptionClient = createSubscriptionObservable(
  'https://mb-hasura-engine.herokuapp.com/v1alpha1/graphql', // GraphQL endpoint
  SUBSCRIBE_QUERY,                                       // Subscription query
  {}                                                // Query variables
);
var myevent;
var consumer = subscriptionClient.subscribe(eventData => {
  // Do something on receipt of the event
  console.log("Received event: ");
var options = { timeZone: 'EST'};
  var date=new Date();
var rightnow= date.toLocaleTimeString('en-AU', options);
  this.myevent={"timestamp":rightnow,"eventData":eventData};
  console.log(JSON.stringify(eventData, null, 2));
}, (err) => {
  console.log('Err');
  console.log(err);
});

setInterval(() => {
  wss.clients.forEach((client) => {
    var d=new Date().toTimeString();
    var envelope={"current":d,"payload":this.myevent};
    console.log('EVENT: +'+JSON.stringify(envelope));
  client.send(JSON.stringify(envelope));
 });
}, 1000);
