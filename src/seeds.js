const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication-client');

const user = {
  name: 'Haico Wensink',
  email: 'haico@test.nl',
  password: 'abcd1234'
};

const games = [
  {
    title: 'Game 1',
    player1: 'Haico',
    player2: 'Seyda',
    score: 0
  },
  {
    title: 'Game 2',
    player1: 'Haico',
    player2: 'Gijs',
    score: 1
  },
  {
    title: 'Game 3',
    player1: 'Haico',
    player2: 'Roger',
    score: 2
  }
];

const feathersClient = feathers();

feathersClient
  .configure(hooks())
  .configure(rest('http://localhost:3030').superagent(superagent))
  .configure(auth());

feathersClient.service('users').create(user)
.then (() => {
  console.log('User successfully created!')
  feathersClient.authenticate({
    strategy: 'local',
    email: user.email,
    password: user.password
  })
  .then(() => {
    games.map((game) => {
      feathersClient.service('games').create(game)
        .then((result) => {
          console.log('Game seeded...', result.title )
        }).catch((error) => {
          console.error('Error seeding game!', error.message )
        });
    })
  })
  .catch(function(error){
    console.error('Error authenticating!', error);
  });
})
.catch(function(error) {
  console.error('Error creating user!');
});
