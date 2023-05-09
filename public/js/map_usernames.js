function getNameByUserName(username) {
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

export { getNameByUserName }