let charView = {
  name: "",
  description: "",
  anime: "",
  credit: {
    author: "",
    pictures: "",
    coder: ""
  }
};

let charBasic = {
  maxHp: 100,
  category: []
};

let charMeta = {
  id: "",
  status: {
    onAttack: [],
    onReceive: [],
    onSkill: [],
    onState: []
  }
};

let charMutable = {
  hp: 100,
  alive: true
};

let char = {
  ...charView,
  ...charBasic,
  ...charMeta,
  ...charMutable
};
