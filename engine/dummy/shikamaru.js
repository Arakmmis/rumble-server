let effect1a = {
  type: "state",
  val: 0,
  name: "Meditate",
  description: "",
  id: "narutoskill1",
  caster: "naruto",
  turnid: "",
  target: "target",
  duration: 5,
  during: "next turn",
  after: [],
  condition: [],
  persistence: "instant",
  class: "physical",
  current: 0,
  usage: 0,
  stack: 0,
  charge: 0,
  multi: 0,
  active: true,
  isStack: false,
  isInvisible: false,
  isMulti: false,
  isUnremovable: false,
  isMarking: false,
  isHarmful: false,
  isPiercing: false,
  isActive: false,
  isLastTurn: false,
  isAllowed: true,
  isNoCounter: false
};

let effect1b = {
  type: "mark",
  val: 0,
  name: "Meditate",
  description: "",
  id: "narutoskill1",
  caster: "naruto",
  turnid: "",
  target: "target",
  duration: 5,
  during: "next turn",
  after: [],
  condition: [],
  persistence: "instant",
  class: "physical",
  current: 0,
  usage: 0,
  stack: 0,
  charge: 0,
  multi: 0,
  active: true,
  isStack: false,
  isInvisible: false,
  isMulti: false,
  isUnremovable: false,
  isMarking: false,
  isHarmful: false,
  isPiercing: false,
  isActive: false,
  isLastTurn: false,
  isAllowed: true,
  isNoCounter: false
};

let skill1 = {
  name: "Meditate",
  description: "",
  picture: "https://i.imgur.com/HsaK0Sh.jpg",
  classes: "instant, mental",
  id: "",
  index: 0,
  caster: "naruto",
  persistence: "instant",
  class: "mental",
  effects: [effect1a, effect1b],
  target: "enemy",
  cooldown: 0,
  cost: {
    g: 0,
    b: 0,
    r: 0,
    w: 0,
    rd: 0
  },
  counter: 0,
  active: true,
  store: [],
  isHarmful: true,
  isAllowed: true,
  isCooldown: false,
  isStore: false,
  isNoCounter: false,
  isIgnoreStun: false,
  isIgnoreInvul: false
};

let effect2a = {
  type: "damage",
  val: 15,
  name: "",
  description: "",
  id: "",
  caster: "",
  turnid: "",
  target: "target",
  duration: [
    { default: 5 },
    {
      subject: "state", //What to look at
      evaluator: "exist", //How to evaluate
      comparison: "Meditate", //Comparison against what. Can be an array with String and Number
      value: 2 //value to return after
    }
  ],
  during: "this turn",
  after: [],
  condition: [],
  persistence: "instant",
  class: "energy",
  scope: ["none"],
  specify: ["skill name", "consideration"],
  current: 0,
  usage: 0,
  stack: 0,
  charge: 0,
  multi: 0,
  active: true,
  isStack: false,
  isInvisible: false,
  isMulti: false,
  isUnremovable: false,
  isMarking: false,
  isHarmful: false,
  isPiercing: false,
  isActive: false,
  isLastTurn: false,
  isAllowed: true,
  isNoCounter: false
};

let effect2b = {
  type: "disable",
  name: "",
  description: "",
  id: "",
  caster: "",
  turnid: "",
  target: "target",
  duration: [
    { default: 1 },
    {
      subject: "state", //What to look at
      evaluator: "exist", //How to evaluate
      comparison: "Meditate", //Comparison against what. Can be an array with String and Number
      value: 2 //value to return after
    }
  ],
  during: "next turn",
  after: [],
  condition: [],
  persistence: "",
  class: "",
  scope: ["types", ["dr", "invul"], "inclusive"],
  current: 0,
  usage: 0,
  stack: 0,
  charge: 0,
  multi: 0,
  active: true,
  isStack: false,
  isInvisible: false,
  isMulti: false,
  isUnremovable: false,
  isMarking: false,
  isHarmful: false,
  isPiercing: false,
  isActive: false,
  isLastTurn: false,
  isAllowed: true,
  isNoCounter: false
};

let skill2 = {
  name: "Shadow-Neck Bind",
  description: "",
  picture: "https://i.imgur.com/psMw9dX.jpg",
  classes: "instant, energy",
  id: "narutoskill2",
  index: 1,
  caster: "naruto",
  persistence: "action",
  class: "physical",
  effects: [effect2a, effect2b],
  target: "all enemies",
  cooldown: 1,
  cost: {
    g: 0,
    b: 0,
    r: 0,
    w: 0,
    rd: 0
  },
  counter: 0,
  active: true,
  store: [],
  isHarmful: true,
  isAllowed: true,
  isCooldown: false,
  isStore: false,
  isNoCounter: false,
  isIgnoreStun: false,
  isIgnoreInvul: false
};

let effect3a = {
  type: "stun",
  name: "Shadow Imitation",
  description: "",
  id: "",
  caster: "",
  turnid: "",
  target: "target",
  duration: [
    { default: 4 },
    {
      subject: "state", //What to look at
      evaluator: "exist", //How to evaluate
      comparison: "Meditate", //Comparison against what. Can be an array with String and Number
      value: 2 //value to return after
    }
  ],
  during: "next turn",
  after: [],
  condition: [],
  persistence: "control",
  class: "energy",
  scope: ["classes", ["mental"], "exclusive"],
  current: 0,
  usage: 0,
  stack: 0,
  charge: 0,
  multi: 0,
  active: true,
  isStack: false,
  isInvisible: false,
  isMulti: false,
  isUnremovable: false,
  isMarking: false,
  isHarmful: false,
  isPiercing: false,
  isActive: false,
  isLastTurn: false,
  isAllowed: true,
  isNoCounter: false
};

let skill3 = {
  name: "Shadow Imitation",
  description: "",
  picture: "https://i.imgur.com/BQLrO8J.jpg",
  classes: "",
  id: "",
  index: 2,
  caster: "",
  persistence: "control",
  class: "physical",
  effects: [effect3a],
  target: "all enemies",
  cooldown: 3,
  cost: {
    g: 0,
    b: 0,
    r: 0,
    w: 0,
    rd: 1
  },
  counter: 0,
  active: true,
  store: [],
  isHarmful: true,
  isAllowed: true,
  isCooldown: false,
  isStore: false,
  isNoCounter: false,
  isIgnoreStun: false,
  isIgnoreInvul: false
};

let effect4 = {
  type: "invul",
  name: "",
  description: "",
  id: "",
  caster: "",
  turnid: "",
  target: "target",
  duration: 1,
  during: "next turn",
  after: [],
  condition: [],
  persistence: "instant",
  class: "strategic",
  scope: ["none"],
  specify: ["skill name", "consideration"],
  current: 0,
  usage: 0,
  stack: 0,
  charge: 0,
  multi: 0,
  active: true,
  isStack: false,
  isInvisible: false,
  isMulti: false,
  isUnremovable: false,
  isMarking: false,
  isHarmful: false,
  isPiercing: false,
  isActive: false,
  isLastTurn: false,
  isAllowed: true,
  isNoCounter: false
};

let skill4 = {
  name: "Shikamaru Hide",
  description: "",
  picture: "https://i.imgur.com/z2XC1U4.jpg",
  classes: "",
  id: "",
  index: 3,
  caster: "",
  persistence: "instant",
  class: "strategic",
  effects: [effect4],
  target: "self",
  cooldown: 4,
  cost: {
    g: 0,
    b: 0,
    r: 0,
    w: 0,
    rd: 1
  },
  counter: 0,
  active: true,
  store: [],
  isHarmful: true,
  isAllowed: true,
  isCooldown: false,
  isStore: false,
  isNoCounter: false,
  isIgnoreStun: false,
  isIgnoreInvul: false
};

let char = {
  name: "Nara Shikamaru",
  description: "",
  picture: "https://i.imgur.com/1zBlB4a.jpg",
  anime: "",
  credit: {
    author: "",
    pictures: "",
    coder: ""
  },
  maxHp: 100,
  category: [],
  id: "shikamaru",
  status: {
    onAttack: [],
    onReceive: [],
    onSkill: [],
    onState: []
  },
  skills: [skill1, skill2, skill3, skill4],
  hp: 100,
  alive: true
};

module.exports = char;

console.log("nothing's wrong");
