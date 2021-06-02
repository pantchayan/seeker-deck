let getPassedTime = (timestamp) => {
  const currTime = Date.now();
  const second = 1000;
  const minute = 1000 * 60;
  const hour = 1000 * 60 * 60;
  const day = 1000 * 60 * 60 * 24;
  const week = 1000 * 60 * 60 * 24 * 7;
  const year = 1000 * 60 * 60 * 24 * 365;

  let timePassed = currTime - timestamp;
  let ans;
  if (timePassed < minute) {
    ans = Math.ceil(timePassed / second);
    return `${ans}s`;
  } else if (timePassed < hour) {
    ans = Math.ceil(timePassed / minute);
    return `${ans}m`;
  } else if (timePassed < day) {
    ans = Math.ceil(timePassed / hour);
    return `${ans}h`;
  } else if (timePassed < week) {
    ans = Math.ceil(timePassed / day);
    return `${ans}d`;
  } else if (timePassed < year) {
    ans = Math.ceil(timePassed / week);
    return `${ans}w`;
  } else {
    ans = Math.ceil(timePassed / year);
    return `${ans}y`;
  }
};
