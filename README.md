# Hasura Postgres Subscription

Live subscriptions and browser updates in response to changes to the Heroku Connect "Contact" table.

Uses the intermediary app [mb-hasura-engine](https://mb-hasura-engine.herokuapp.com), which defines a remote PG view called "mycontacts" - adjust this accordingly. The use of a view allows phrasing queries with predicates such as:

...WHERE (contact.systemmodstamp > (now() - '1 hour'::interval)). 

i.e. changes to Contact records in the last one hour.


Based on code at [nodejs-graphql-subscriptions-boilerplate](https://github.com/hasura/nodejs-graphql-subscriptions-boilerplate)
# Features
  -Hasura
  -Postgres
  -Heroku Connect
### Installation
Coming
