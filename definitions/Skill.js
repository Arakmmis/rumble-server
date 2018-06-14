//Skill
let skillView = {
  name: "",
  description: "",
  picture: "",
  classes: ""
};

let skillMeta = {
  id: "",
  index: 0,
  caster: "" //Caster ID
};

let skillBasic = {
  persistence: "",
  class: "",
  effects: [],
  target: "",
  cooldown: 0,
  cost: {
    g: 0,
    r: 0,
    b: 0,    
    w: 0,
    rd: 0
  }
};

let skillMutable = {
  cooldownCounter: 0,
  active: true,
  store: []
};

let skillState = {
  isHarmful: true,
  isAllowed: ["condition"], //Condition
  isCooldown: false,
  isStore: false,
  isNoCounter: false,
  isIgnoreStun: false,
  isIgnoreInvul: false
};

let skill = {
  ...skillView,
  ...skillMeta,
  ...skillBasic,
  ...skillMutable,
  ...skillState
};
