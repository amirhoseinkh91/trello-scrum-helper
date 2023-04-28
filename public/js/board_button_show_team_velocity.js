function readElapsedTimeFromCardName(card) {
  const regex = /.*(\[[0-9]{1,2}\]).*/;
  if (regex.test(card.name || '')) {
    return parseInt(regex.exec(card.name)[1].replace('[', '').replace(']', ''))
  } else {
    return 0;
  }
}
function readEstimatedTimeFromCardName(card) {
  const regex = /.*(\([0-9]{1,2}\)).*/;
  if (regex.test(card.name || '')) {
    return parseInt(regex.exec(card.name)[1].replace('(', '').replace(')', ''))
  } else {
    return 0;
  }
}
const showTeamVelocity = async function (t, opts) {
  const validListNames = ["Sprint Backlog", "Doing", "Testing", "Code Review", "Deploy Pending", "Done 🎉"];
  const velocityPerMember = [];
  for (const list of await t.lists("id", "name")) {
    if (!validListNames.includes(list.name)) {
      continue;
    }
    for (const card of await t.cards("all")) {
      if (card.idList === list.id) {
        const elapsedTime = readElapsedTimeFromCardName(card)
        const estimatedTime = readEstimatedTimeFromCardName(card)
        card.members.forEach(cardMember => {
          let obj = velocityPerMember.find(item => item.username == cardMember.username);
          if (obj === null || obj === undefined) {
            obj = {
              username: cardMember.username,
              done: 0,
              doing: 0,
              not_started: 0,
            }
            velocityPerMember.push(obj)
          }
          if (list.name === "Done 🎉") {
            obj.done = (obj.done) + (elapsedTime)
          } else if (list.name === "Sprint Backlog") {
            obj.not_started = (obj.not_started) + (estimatedTime)
          } else {
            obj.doing = (obj.doing) + (elapsedTime)
          }
        });
      }
    }
  }
  const resultItems = velocityPerMember.map(item => {
    return {text: item.username + "-> not started " +  item.not_started + ", doing " + item.doing + ", done " + item.done};
  });
  // return await t.popup({
  //   title: "Team Velocity",
  //   items: resultItems
  // });
  return await t.modal({
    url: "./../../public/TeamVelocity.html",
    args: {
      resultItems: velocityPerMember,
    },
    fullscreen: false,
    title: "Team Velocity",
  });
};

export { showTeamVelocity }
