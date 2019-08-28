const { forwardTo } = require('prisma-binding');

const Query = {
  barbacks: forwardTo('db'),
  barback: forwardTo('db'),
  notes: forwardTo('db'),
  note: forwardTo('db'),
  award: forwardTo('db'),
  awards: forwardTo('db'),
  awardVotes: forwardTo('db'),
  awardVoteses: forwardTo('db'),
  noteVotes: forwardTo('db'),
  noteVoteses: forwardTo('db'),
};

module.exports = Query;
