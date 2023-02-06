const newShowEstimates = async function (trello, opts) {
  return trello.modal({
    title: "Estimates",
    url: './../EstimatesModal.html',
    fullscreen: true
  });
};

export { newShowEstimates }