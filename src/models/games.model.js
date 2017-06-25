// games-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');


  const playerShema = new mongooseCient.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    score: { type: Number, default: 0 } //player starts with a score of 0.
  })


  const games = new mongooseClient.Schema({
    players: [playerSchema],
    winnerId: { type: Schema.Types.ObjectId, ref: 'users' },
    authorId: { type: Schema.Types.ObjectId, ref: 'users'}
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('games', games);
};
