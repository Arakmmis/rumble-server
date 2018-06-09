const _ = require("lodash");
let skillQueue = require("./skillQueue.js");
let duration = require("./duration.js");
let usingCleanup = require("./usingCleanup.js");

async function battle(pkg, callback) {
  //Define
  let state = _.cloneDeep(pkg.state);
  const getQueue = () => {
    let action = _.cloneDeep(pkg.action);
    return _.uniqBy(action, "turnid");
  };
  let queue = getQueue();
  console.log(queue);
  const getTurn = () => {
    return state.turn;
  };
  let turn = getTurn();

  //Assign Turn
  let ally = turn % 2 === 1 ? "odd" : "even";
  let enemy = turn % 2 === 1 ? "even" : "odd";

  //Skill Queue
  state = await skillQueue({
    state: state,
    ally: ally,
    enemy: enemy,
    queue: queue
  });

  //Post Sequence
  state = await duration({
    state: state,
    ally: ally,
    enemy: enemy,
    queue: queue
  });

  const setUsing = queue => {
    state[ally].using = state[ally].using.concat(queue);
  };
  setUsing(queue);
  state = await usingCleanup({
    state: state,
    ally: ally,
    enemy: enemy
  });

  const setTurn = state => {
    state.turn++;
    state.turnid = "turn" + state.turn;
  };
  setTurn(state);

  //Exit
  callback(state);
}

module.exports = battle;
