var colors = window.TrelloPowerUp.util.colors;

const newShowEstimates = async function (trello, opts) {
  return trello.modal({
    title: "Estimates",
    url: './../../public/EstimatesModal.html',
    fullscreen: true,
    accentColor: colors.getHexString('blue'),
    actions: [{
      icon: './../../public/icons/wall-clock-24.png',
      url: 'https://google.com',
      alt: 'Leftmost',
      position: 'left',
    }, {
      icon: './../../public/icons/wall-clock-24.png',
      callback: (tr) => tr.popup({
        title: tr.localizeKey('appear_in_settings'),
        url: 'settings.html',
        height: 164,
      }),
      alt: 'Second from left',
      position: 'left',
    }, {
      icon: './../../public/icons/wall-clock-24.png',
      callback: () => console.log(':tada:'),
      alt: 'Right side',
      position: 'right',
    }],
  });
};

export { newShowEstimates }