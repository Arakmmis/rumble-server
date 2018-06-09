function char() {
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
    },
    skills: []
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

  return char;
}

function skill() {
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
      b: 0,
      r: 0,
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

  return skill;
}

function effect() {
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
    during: "myTurn", //When will it trigger
    after: [], //Callback after mechanic trigger
    condition: [], //This mechanic will trigger if certain condition is fulfilled
    persistence: "", //Persistence of effect
    class: "", //Class of effect
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
    ...effectView,
    ...effectMeta,
    ...effectBasic,
    ...effectMutable,
    ...effectState
  };

  return effect;
}
