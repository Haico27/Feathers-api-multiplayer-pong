// games-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');


  const playerSchema = new mongooseClient.Schema({
    userId: { type: mongooseClient.Schema.Types.ObjectId, ref: 'users' },
    score: { type: Number, default: 0 } //player starts with a score of 0.
  })


  const games = new mongooseClient.Schema({
    title: { type: String },
    players: [playerSchema],
    winnerId: { type: mongooseClient.Schema.Types.ObjectId, ref: 'users' },
    authorId: { type: mongooseClient.Schema.Types.ObjectId, ref: 'users'},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('games', games);
};
