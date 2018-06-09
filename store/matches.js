let engine = require("../engine/index.js")();

function matches() {
  //Define
  let match = {
    players: [],
    room: "",
    channel: "",
    state: []
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
      state: [instance]
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

module.exports = matches;
