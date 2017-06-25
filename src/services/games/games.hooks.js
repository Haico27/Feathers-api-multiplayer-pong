const { authenticate } = require('feathers-authentication').hooks;
const { restrictToOwner, associateCurrentUser, restrictToAuthenticated } = require('feathers-authentication-hooks');

const restrict = [
  authenticate('jwt'),
  restrictToAuthenticated(),
  restrictToOwner({
    ownerField: 'authorId'
  })
];

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      authenticate('jwt'),
      associateCurrentUser({ as: 'authorId' }), //this will add the _id of the current user to the games authorId
    ],
    update: [
      ...restrict
    ],
    patch: [
      ...restrict
    ],
    remove: [
      ...restrict
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
