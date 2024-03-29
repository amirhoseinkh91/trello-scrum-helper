// import { readElapsedTimeFromCard, readEstimatedTimeFromCard } from "/public/js/global.js"

function readEstimatedTimeFromCard(card) {
  const regex = /.*(\([0-9]{1,2}\)).*/;
  if (regex.test(card.name || '')) {
    return parseInt(regex.exec(card.name)[1].replace('(', '').replace(')', ''))
  } else {
    return 0;
  }
}

function readElapsedTimeFromCard(card) {
  const regex = /.*(\[[0-9]{1,2}\]).*/;
  if (regex.test(card.name || '')) {
    return parseInt(regex.exec(card.name)[1].replace('[', '').replace(']', ''))
  } else {
    return 0;
  }
}

const showSummary = async function (trello) {
  const validListNames = ["Sprint Backlog", "Doing", "Testing", "Code Review", "Deploy Pending", "Done 🎉"];
  const velocityPerMember = [];
  for (const list of await trello.lists("id", "name")) {
    if (!validListNames.includes(list.name)) {
      continue;
    }
    for (const card of await trello.cards("all")) {
      if (card.idList === list.id) {
        const elapsedTime = readElapsedTimeFromCard(card)
        const estimatedTime = readEstimatedTimeFromCard(card)
        card.members.forEach(cardMember => {
          let obj = velocityPerMember.find(item => item.username == cardMember.username);
          if (obj === null || obj === undefined) {
            obj = {
              username: cardMember.username,
              done: 0,
              doing: 0,
              notStarted: 0,
            }
            velocityPerMember.push(obj)
          }
          if (list.name === "Done 🎉") {
            obj.done = (obj.done) + (elapsedTime)
          } else if (list.name === "Sprint Backlog") {
            obj.notStarted = (obj.notStarted) + (estimatedTime)
          } else {
            obj.doing = (obj.doing) + (elapsedTime)
          }
        });
      }
    }
  }

  return await trello.modal({
    url: "/public/BoardSummary.html",
    args: {
      velocitiesPerMember: velocityPerMember,
    },
    fullscreen: true,
    title: "Summary",
  });
};

export { showSummary }
