async function skillSort(res) {
  //Define
  let state = _.cloneDeep(res.state);
  let { ally, enemy, turnid, effects } = res;
  //Check
  if (state.turnid !== turnid) {
    return state;
  }
  //Logic
  for (res of effects) {
    if (res.type === "damage") {
      state[enemy].char[0].status.onSkill = state[
        enemy
      ].char[0].status.onSkill.concat({ ...res, turnid: state.turnid });
    }
  }
  //Return
  return state;
}

async function skillQueue(res) {
  //Define
  let state = _.cloneDeep(res.state);
  let { ally, enemy, queue } = res;
  //Logic
  for (let res of queue) {
    //Get Skill
    let skill = getSkill({
      ally: ally,
      skill: res.skill,
      state: state
    });

    //Sort
    state = await skillSort({
      state: state,
      ally: ally,
      enemy: enemy,
      turnid: res.turnid,
      effects: skill.effects
    });

    //Apply Effect
    state = await onSkillApply({
      state: state,
      enemy: enemy,
      turnid: res.turnid
    });
  }
  //Return
  return state;
}

function getSkill(res) {
  //Define
  let { ally, skill, state } = res;
  //Return
  return state[ally].char[0].skills[skill];
}

function damage(res) {
  //Define
  let state = _.cloneDeep(res.state);
  let { enemy, effect } = res;
  //Return
  return state[enemy].char[0].hp - effect.valDmg;
}

async function onSkillApply(res) {
  //Define
  let state = _.cloneDeep(res.state);
  let { enemy, turnid } = res;
  let effects = state[enemy].char[0].status.onSkill.filter(
    x => x.turnid === turnid
  );
  //Logic
  for (res of effects) {
    console.log(res);
    if (res.type === "damage") {
      state[enemy].char[0].hp = damage({
        state: state,
        enemy: enemy,
        effect: res
      });
    }
  }
  //Return
  return state;
}

async function battle(res, callback) {
  //Define
  let state = _.cloneDeep(res.state);
  const getQueue = () => {
    let action = _.cloneDeep(res.action);
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
  const setUsing = res => {
    state[ally].using = state[ally].using.concat(res);
  };
  setUsing(queue);

  const setTurn = () => {
    state.turn++;
    state.turnid = "turn" + state.turn;
  };
  setTurn();

  //Exit
  callback(state);
}
