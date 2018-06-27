const uniqid = require("uniqid");
let engine = require("../engine/index.js")();

//Functions
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function queue() {
  let queue = [];

  function matchMaking(payload, callback) {
    let pool = queue.length;
    let exist = queue.some(x => x.player === payload.player);
    if (!exist) {
      if (pool > 0) {
        //There's Opponent
        let randomIndex = getRandomInt(pool); //Randomly Choose Opponent
        let opponent = queue[getRandomInt(pool)]; //Get Opponent from Queue
        queue = queue.filter(x => x.player !== opponent.player); //Remove Opponent from Queue
        callback(opponent); //Callback to Getter
      } else {
        //No Opponent
        queue.push({
          player: payload.player,
          chars: payload.chars,
          socket: payload.socket,
          room: uniqid.time()
        }); //Add self to Queue
      }
    }
  }

  function matchMakingCancel(payload, callback) {
    queue = queue.filter(x => x.player !== payload.player); //Remove Opponent from Queue
  }

  //expose
  return {
    search: matchMaking,
    cancel: matchMakingCancel
  };
}

function matches() {
  //Define
  let match = {
    players: [],
    room: "",
    channel: ""
  };

  //Store
  let matches = [];

  //Operators
  const setMatch = pkg => {
    let instance = engine.initiate();

    let match = {
      players: pkg.players,
      room: pkg.room,
      channel: pkg.channel,
      state: [instance.state]
    };
    matches = matches.concat(match);
  };
  const getMatch = pkg => {
    let match = matches.filter(x => x.room === pkg.room);
    if (match.length === 0) {
      return false;
    }
    return match[0];
  };
  const updateMatch = (type, pkg) => {
    if (type === "state") {
      let index = matches.findIndex(x => x.room === pkg.room);
      matches[index].state = matches[index].state.concat(pkg.state);
    } else if (type === "player") {
      let index = matches.findIndex(x => x.room === pkg.room);
      matches[index].players = matches[index].players.concat(pkg.player);
    }
  };

  //Expose
  return {
    initiateMatch: (pkg, cb) => {
      let match = getMatch(pkg);
      if (match === false) {
        setMatch(pkg);
      }
    },
    setMatch: setMatch,
    getMatch: getMatch,
    updateMatch: updateMatch,
    deleteMatch: match => {
      matches = matches.filter(x => x === match);
    }
  };
}

module.exports = queue;
