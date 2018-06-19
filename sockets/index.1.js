let engine = require("../engine/index.js")();
let matches = require("../store/matches.js")();
let queue = require("../store/queue.js")();

module.exports = function(http) {
  //Define
  let io = require("socket.io")(http);

  //Connection
  io.on("connection", function(socket) {
    console.log("connected");

    //Sockets
    socket.on("initiate", async packet => {
      //Register Match
      let match = {
        players: ["tes1", "test2"], //Later take from session
        room: "test",
        channel: "test"
      };
      //Initiate Match
      matches.initiateMatch(match);
      //Get Match and Prepare Payload
      let res = matches.getMatch(match);
      //Parse State
      let state = await engine.parser({
        state: res.state[res.state.length - 1],
        ally: "odd",
        enemy: "even"
      });
      //Prepare Meta
      let ally = state.odd.name === packet.player ? "odd" : "even";
      let enemy = state.even.name !== packet.player ? "even" : "odd";
      let meta = {
        mode: "playing", //playing, spectate, replay
        channel: "private", //private, ladder,
        ally: ally,
        enemy: enemy
      };
      //Prepare Payload
      let payload = {
        meta: meta,
        state: state
      };
      //Emit Payload
      socket.emit("initiate", payload);
    });

    socket.on("battle", packet => {
      console.log(packet);
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
        action: packet.action,
        redeem: packet.redeem
      };
      engine.battle(pkgEngine, res => {
        let pkgUpdate = {
          room: "test",
          state: res.state
        };
        matches.updateMatch("state", pkgUpdate);
        let pkgEmit = {
          state: res.view
        };
        io.emit("result", pkgEmit);
      });
    });

    socket.on("search", packet => {
      let pkgSearch = {
        username: packet.username,
        char: [],
        socket: socket.id
      };
      queue.search(pkgSearch, x => {
        io.to(x.socket).emit("found", {
          room: x.room
        });
        io.to(socket.id).emit("found", {
          room: x.room
        });

        //Register Match
        let match = {
          players: ["tes1", "test2"], //Later take from session
          room: "test",
          channel: "test"
        };
        //Initiate Match
        matches.initiateMatch(match);
      });
    });
  });
};
