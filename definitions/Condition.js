// Condition has 4 components
// subject
// evaluator
// comparison
// value

let subject = [
  "effect",
  "cooldown",
  "duration",
  "usage",
  "stack",
  "charge",
  "value",
  "hp",
  "active",
  "caster",
  "target",
  "damage",
  "invul"
];

let evaluator = ["==", ">", "<", ">=", "<=", "!=", "exist", "none"];

let comparison = [String, Number, Boolean];

let conditions = ["condition1", "condition2", "default"]; //Always has a default which is a single return

let condition = {
  default: true,
  conditions: []
};

//What a condition look like
let condition = {
  subject: "effect", //What to look at
  evaluator: "exist", //How to evaluate
  comparison: "skill1", //Comparison against what. Can be an array with String and Number
  value: true //value to return after
};

//Multiple condition is grouped as conditions
let conditions = ["condition"];

//Seperate Condition and Evaluation
//Condition -> Whether an effect will take place or not
//Evaluation -> Return a value if evaluation equals to true

//Condition inside an object
let obj = {
  default: true,
  conditions: [
    {
      subject: "effect",
      evaluator: "exist",
      comparison: "skill1",
      value: true
    }
  ]
};

//In practice

let damage = {
  valDmg: {
    default: 20,
    conditions: [
      {
        subject: "effect",
        evaluator: "exist",
        comparison: "skill1",
        value: 40
      }
    ]
  }
};
