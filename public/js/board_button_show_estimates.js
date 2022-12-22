const showEstimates = async function (t, opts) {
  return t.popup({
    title: "Select a list:",
    items: await t.lists("id", "name").then(
      await function (lists) {
        return lists.map(function (list) {
          return {
            text: list.name,
            callback: async function (t, opts) {
              var cardsInList = await t.cards("all")
                .then(function (cards) {
                  return cards.filter(function (card) {
                    return card.idList == list.id;
                  });
                });
                const estimatePerMember = []
                function updateTimesForMember(userName, estimates, elapsed) {
                  let obj = estimatePerMember.find(item => item.username == userName)
                  if (obj != null) {
                    obj.estimates = (obj.estimates || 0 ) + (estimates || 0)
                    obj.elapsed = (obj.elapsed || 0 ) + (elapsed || 0)
                  } else {
                    obj = {
                      username: userName,
                      estimates: (estimates || 0),
                      elapsed: (elapsed || 0)
                    }
                    estimatePerMember.push(obj)
                  }
                }
                function readEstimatedTimeFromCardName(card) {
                  const regex = /.*(\[[0-9]{1,2}\]).*/;
                  if (regex.test(card.name || '')) {
                    return parseInt(regex.exec(card.name)[1].replace('(', '').replace(')', ''))
                  } else {
                    return 0;
                  }
                }
                function readElapsedTimeFromCardName(card) {
                  const regex = /.*(\([0-9]{1,2}\)).*/;
                  if (regex.test(card.name || '')) {
                    return parseInt(regex.exec(card.name)[1].replace('[', '').replace(']', ''))
                  } else {
                    return 0;
                  }
                }
                cardsInList.forEach(card => {
                  const cardEstimate = readEstimatedTimeFromCardName(card)
                  const cardElapsedTime = readElapsedTimeFromCardName(card)
                  if (card.members.length == 0) {
                    updateTimesForMember('no assignee', cardEstimate, cardElapsedTime)
                  } else {
                    card.members.forEach(cardMember => {
                      updateTimesForMember(cardMember.username, cardEstimate, cardElapsedTime)
                    });
                  }
                });
              t.popup({
                title: 'Estimates',
                items: estimatePerMember.map(function(item) {
                   return {
                    text: item.username + '=>  est: ' + item.estimates+ '\t  elapsed: ' + item.elapsed,
                    callback: function() {}
                   };
                })
              });
            },
          };
        });
      }
    ),
    search: {
      count: 30,
      placeholder: "Search Lists",
      empty: "No List Found",
    },
  });
};

export { showEstimates }