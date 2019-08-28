const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
  async signup(parent, args, ctx, info) {
    if (args.secret !== 'carbombs') {
      throw new Error("You ain't a barback...");
    }

    // lowercase their email
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the database
    const user = await ctx.db.mutation.createBarback(
      {
        data: {
          email: args.email,
          name: args.name,
          password,
        },
      },
      info
    );

    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // We set the jwt as a cookie on the response

    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });
    // Finalllllly we return the user to the browser
    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    // 1. check if there is a user with that email

    const user = await ctx.db.query.barback({ where: { email } });
    if (!user) {
      throw new Error(`No barback recognized.`);
    }
    // 2. Check if their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid Password!');
    }
    // 3. generate the JWT Token

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token

    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    // 5. Return the user
    return user;
  },
  async createNote(parent, args, ctx, info) {
    const note = await ctx.db.mutation.createNote(
      {
        data: {
          creator: {
            connect: { name: args.name },
          },
          text: args.text,
        },
      },
      info
    );
    return note;
  },
  async createAward(parent, args, ctx, info) {
    const newAward = await ctx.db.mutation.createAward(
      {
        data: {
          ...args,
        },
      },
      info
    );
    return newAward;
  },
  async noteVote(parent, args, ctx, info) {
    const vote = await ctx.db.query.noteVoteses(
      {
        where: {
          voter: { name: args.voter },
        },
      },
      info
    );
    const votedForThisOne = await ctx.db.query.noteVoteses(
      {
        where: {
          voter: { name: args.voter },
          note: { id: args.id },
        },
      }
      // console.log(info)
    );

    // const voteLength = vote.length;
    // console.log('here is vote', vote);
    console.log('voted here', votedForThisOne);
    // return vote;
    if (vote.length === 5 && !votedForThisOne.length) {
      throw new Error(
        "You used your votes already, unvote something if you think it's worth it..."
      );
    }
    if (votedForThisOne.length) {
      let voteId = votedForThisOne[0].id;
      const removeVote = await ctx.db.mutation.deleteNoteVotes(
        {
          where: { id: voteId },
        },
        info
      );
      return removeVote;
    } else {
      const addVote = await ctx.db.mutation.createNoteVotes(
        {
          data: {
            voter: { connect: { name: args.voter } },
            note: { connect: { id: args.id } },
          },
        },
        info
      );
      return addVote;
    }
  },
};

module.exports = Mutations;
