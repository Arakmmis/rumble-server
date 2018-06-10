//Define

let effectView = {
  name: "", //Inherit from Skill
  description: ""
};

let effectMeta = {
  id: "", //Inherit from Skill
  caster: "", //Caster's id
  turnid: "" //Turn Id
};

let effectBasic = {
  target: "target", //Caster or target
  duration: 1, //How long it's active. Minimum of 1
  during: "odd", //When will it trigger, odd turn or even turn
  after: [], //Callback after mechanic trigger
  condition: [], //This mechanic will trigger if certain condition is fulfilled
  persistence: "", //Persistence of effect
  class: "", //Class of effect
  scope: ["extent", ["items"], ["effect type"]], //['include/exclude', 'classes', 'type'] || ['specific', ['name']]
  specify: ["skill name", "consideration"] //Thinking about separating this from scope
};

let effectMutable = {
  current: 0,
  usage: 0,
  stack: 0,
  charge: 0,
  multi: 0,
  active: true //May not be needed if root back to onUsing
};

let effectState = {
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

//Effects

let damage = {
  type: "damage", //Mechanic
  valDmg: 0 //Value
};

let stun = {
  type: "stun"
  //Access to Scope
};

let dd = {
  type: "dd",
  valDd: 0
};

let invul = {
  type: "invul"
  //Access to Scope
};

let seclude = {
  type: "seclude"
};

let counter = {
  type: "counter"
  //Access to Scope
};

let reflect = {
  type: "reflect"
  //Access to Scope
};

let replace = {
  type: "replace"
  //Access to Scope
};

let boost = {
  type: "boost",
  valBoost: 0
  //Access to Scope or Specify
};

let dr = {
  type: "dr",
  valDr: 0
  //Access to Scope
};

let buff = {
  type: "buff",
  valBuff: 0
  //Access to Scope
};

let nerf = {
  type: "nerf",
  valNerf: 0
};

let energy = {
  type: "energy",
  action: "drain, remove, gain, steal",
  valChakra: 0 //Ammount to drain, remove, or gain
};

let remove = {
  type: "remove",
  action: ["harmful", "non-harmful", "class", "persistence", "specific"]
};

let ignore = {
  type: "ignore"
  //Access to Scope
};

let cooldown = {
  type: "cooldown",
  action: "increase, decrease",
  valCooldown: 0
};

let duration = {
  type: "duration",
  action: "increase, decrease",
  valDuration: 0
};

let heal = {
  type: "heal",
  valHeal: 0
};

let charge = {
  type: "charge",
  valCharge: 0
};

let stack = {
  type: "stack",
  action: "increase, decrease, remove",
  valStack: 0
};

let mark = {
  type: "mark"
};

let cost = {
  type: "cost",
  action: "increase, decrease",
  specify: ["skill name", "g, b, r, w, rd"],
  valCost: 0
};

let instakill = {
  type: "instakill"
};

//Prep State
let allow = {
  type: "allow"
};
