//Battle Pre-Sequence
let turn
let organize

//Battle Sequence - Loop
//Activation
let skill
let cost
//Calculation
let sort
let counter
let stun
let ignore
let triggers
let persistence
//Resolution
let receiver //(?) Not sure best position for this yet
let apply

//Battle Post-Sequence
let duration
let cleanup //Alive/Death, excess HP
let energy
let parse

//Skill Type
let counter, reflect //Flow
let stun, invul, seclude, ignore, charge, mark, state //State
let boost, buff, dr, nerf, dd //Modifier
let damage, heal, energy, cost, replace, remove, cooldown, duration //Move
let receive, attack //Triggers

//Apply Sequence
//Activation
let define
//Calculation
let casterOnAttack
let targetOnReceive
//Resolution
let targetApply

//Parser
let condition
let modifier
let value