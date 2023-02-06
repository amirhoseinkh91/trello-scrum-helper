const newShowEstimates = async function (trello, opts) {
  return trello.modal({
    title: "Estimates",
    url: './../../public/EstimatesModal.html',
    fullscreen: true
  });
};

export { newShowEstimates }