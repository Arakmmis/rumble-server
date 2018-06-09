let engine = require("../engine/index.js")();
let matches = require("../store/matches.js")();

module.exports = function(http) {
  //Define
  let io = require("socket.io")(http);

  //Connection
  io.on("connection", function(socket) {
    console.log("connected");

    //Sockets
    socket.on("initiate", packet => {
      console.log(packet);

      let match = {
        players: ["test", "test1"], //Later take from session
        room: "test",
        channel: "test"
      };
      matches.initiateMatch(match);
      let res = matches.getMatch(match);
      socket.emit("initiate", { state: res.state[0] });
    });

    socket.on("battle", packet => {
      //Match Data
      let pkgMatch = {
        players: ["test", "test1"], //Later take from session
        room: "test",
        channel: "test"
      };
      let match = matches.getMatch(pkgMatch);

      //Engine Data
      let pkgEngine = {
        state: match.state[match.state.length - 1],
        action: packet.action
      };
      engine.battle(pkgEngine, res => {
        let pkgUpdate = {
          room: "test",
          state: res
        };
        matches.updateMatch("state", pkgUpdate);
        io.emit("result", res);
      });
    });
  });
};
