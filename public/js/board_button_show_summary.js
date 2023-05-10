import { readElapsedTimeFromCard, readEstimatedTimeFromCard } from "/public/js/global.js"
const showSummary = async function (t, opts) {
  const validListNames = ["Sprint Backlog", "Doing", "Testing", "Code Review", "Deploy Pending", "Done 🎉"];
  const velocityPerMember = [];
  for (const list of await t.lists("id", "name")) {
    if (!validListNames.includes(list.name)) {
      continue;
    }
    for (const card of await t.cards("all")) {
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

  return await t.modal({
    url: "/public/BoardSummary.html",
    args: {
      velocitiesPerMember: velocityPerMember,
    },
    fullscreen: true,
    title: "Summary",
  });
};

export { showSummary }
