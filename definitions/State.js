let energy = {
  g: 0,
  r: 0,
  b: 0,
  w: 0
};

let team = {
  char: [],
  energy: energy,
  name: "",
  using: []
};

let state = {
  odd: team,
  even: team,
  turn: 0,
  timestamp: new Date.now()
};

let stateMeta = {
  room: "",
  channel: "",
  log: []
};
