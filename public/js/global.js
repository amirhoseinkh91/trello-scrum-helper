function convertUsernameToName(username) {
  switch (username) {
    case 'amirhosseinkhalouei':
      return 'امیرحسین';
    case 'atiatashi':
      return 'عاطفه';
    case 'sadeghzare3':
      return 'صادق';
    case 'mohammadsalimjafari':
      return 'سلیم';
    default:
      return username;
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

function readEstimatedTimeFromCard(card) {
  const regex = /.*(\([0-9]{1,2}\)).*/;
  if (regex.test(card.name || '')) {
    return parseInt(regex.exec(card.name)[1].replace('(', '').replace(')', ''))
  } else {
    return 0;
  }
}

export { convertUsernameToName, readElapsedTimeFromCard, readEstimatedTimeFromCard }