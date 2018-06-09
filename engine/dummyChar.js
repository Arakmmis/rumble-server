const _ = require('lodash')

function getChar() {
  //Define

  let effectView = {
    name: "Uzumaki Combo", //Inherit from Skill
    description: "Deal 20"
  };

  let effectMeta = {
    id: "narutoSkill1", //Inherit from Skill
    caster: "naruto", //Caster's id
    turnid: "" //Turn Id
  };

  let effectBasic = {
    target: "target", //Caster or target
    duration: 1, //How long it's active. Minimum of 1
    during: "myTurn", //When will it trigger
    after: [], //Callback after mechanic trigger
    condition: [], //This mechanic will trigger if certain condition is fulfilled
    persistence: "instant", //Persistence of effect
    class: "physical", //Class of effect
    scope: ["extent", ["items"], ["effect tyoe"]], //['include/exclude', 'classes', 'type'] || ['specific', ['name']]
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

  let effect = {
    type: "damage",
    valDmg: 20,
    ...effectView,
    ...effectMeta,
    ...effectBasic,
    ...effectMutable,
    ...effectState
  };

  //Skill Data
  let skillView = {
    name: "Uzumaki Combo",
    description: "Deal 20 Damage",
    picture: "",
    classes: ""
  };

  let skillMeta = {
    id: "narutoSkill1",
    index: 0,
    caster: "naruto" //Caster ID
  };

  let skillBasic = {
    persistence: "",
    class: "",
    effects: [effect],
    target: "",
    cooldown: 0,
    cost: {
      g: 1,
      b: 0,
      r: 0,
      w: 0,
      rd: 0
    }
  };

  let skillMutable = {
    cooldownCounter: 0,
    active: true
  };

  let skillState = {
    isHarmful: true,
    isAllowed: ["condition"], //Condition
    isCooldown: false,
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

  //Char Data
  let charView = {
    name: "Naruto",
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
    ...charMutable,
    skills: [skill]
  };

  return char;
}

module.exports = getChar;
