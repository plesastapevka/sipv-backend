const empty = (x) => {
  switch (x) {
    case '':
    case 0:
    case '0':
    case null:
    case false:
    case ' ':
    case typeof this === 'undefined':
      return true;
    default: {
      if (x.length <= 0) {
        return true;
      }
      return false;
    }
  }
};

const getDateTime = () => {
  const today = new Date();
  let dd = today.getDate();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  let mm = today.getMonth() + 1;
  if (mm < 10) {
    mm = `0${mm}`;
  }
  const yyyy = today.getFullYear();
  const date = `${yyyy}-${mm}-${dd}`;
  // Current time
  let h = today.getHours();
  if (h < 10) {
    h = `0${h}`;
  }
  let min = today.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = today.getSeconds();
  if (sec < 10) {
    sec = `0${sec}`;
  }
  const time = `${h}:${min}:${sec}`;

  return `${date} ${time}`;
};

module.exports = {
  empty,
  getDateTime,
};
