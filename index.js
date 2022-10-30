exports.validatePESEL = function(PESEL) {
  if (typeof PESEL !== "string") {
    throw ('Invalid argument type. Validator only accepts strings. See docs for more info.')
  } else if (PESEL.length !== 11) {
    throw (`Argument length invalid, 11 characters expected, ${PESEL.length} provided.`);
  } else if (!/^\d+$/.test(PESEL)) {
    throw ('Argument contains invalid characters. Only digits are allowed.');
  }
  const PESELday = Number(PESEL.slice(4, 6));
  const PESELmonth = Number(PESEL.slice(2, 4));
  const PESELyear = Number(PESEL.slice(0, 2));
  const currentYear = Number(String(new Date().getFullYear()).slice(-2));
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const numberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const adjustedPESELMonth = PESELmonth > 12 ? PESELmonth - 20 : PESELmonth;
  const numberOfDaysInPESELmonth = numberOfDays[adjustedPESELMonth-1];
  // Validation of birthdate (cannot be in the future)
  if (PESELyear > currentYear && PESELmonth > 12) {
    return false;
  }
  if (PESELyear === currentYear && adjustedPESELMonth > currentMonth) {
    return false;
  }
  if (PESELyear === currentYear && adjustedPESELMonth === currentMonth && PESELday > currentDay) {
    return false;
  }
  // Validation of birth month (higher than 32 is impossible)
  if (PESELmonth > 32) {
    return false;
  }
  // Chech if birth day does not exceed number of days in birth month
  if (PESELday > numberOfDaysInPESELmonth) {
    return false;
  }
  //Validation of check digit
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  splitPESEL = PESEL.split('');
  const checkSum = weights.reduce((prev, curr, index) => 
    prev + (Number(splitPESEL[index]) * curr), 0);
  const checkDigit = String(10 - checkSum).slice(-1);
  if (checkDigit !== PESEL[10]) {
    return false;
  } 
    return true
}

exports.getBirthDatefromPESEL = function(PESEL) {
  if (typeof PESEL !== "string") {
    throw ('Invalid argument type. Validator only accepts strings. See docs for more info.')
  } else if (PESEL.length !== 11) {
    throw (`Argument length invalid, 11 characters expected, ${PESEL.length} provided.`);
  } else if (!/^\d+$/.test(PESEL)) {
    throw ('Argument contains invalid characters. Only digits are allowed.');
  } else if (!exports.validatePESEL(PESEL)) {
    throw ('PESEL number provided is invalid');
  }
  const PESELday = Number(PESEL.slice(4, 6));
  const PESELmonth = Number(PESEL.slice(2, 4));
  const PESELyear = Number(PESEL.slice(0, 2));
  const adjustedPESELMonth = PESELmonth > 12 ? PESELmonth - 20 : PESELmonth;
  const fullYear = PESELmonth <= 12 ? PESELyear + 1900 : PESELyear + 2000;
  return new Date(fullYear, adjustedPESELMonth - 1, PESELday);
}

exports.generateRandomPESEL = function() {
  const currentYear = Number(String(new Date().getFullYear()).slice(-2));
  const numberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let randomYear;
  let randomMonth;
  let randomDay;
  let adjustedPESELMonth;
  while (true) {
    randomMonth = Math.floor(Math.random() * (32 - 1) + 1);
    if (randomMonth <= 12 || (randomMonth >= 20 && randomMonth <= 32)) {
      break;
    } 
  }
  if (randomMonth <= 12) {
    randomYear = Math.floor(Math.random() * 99);
    adjustedPESELMonth = randomMonth
  } else {
    randomYear = Math.floor(Math.random() * (currentYear - 1));
    adjustedPESELMonth = randomMonth - 20;
  }
  while(true) {
    randomDay = Math.floor(Math.random() * (31 - 1) + 1);
    if (randomDay <= numberOfDays[adjustedPESELMonth - 1]) {
      break
    }
  }
  const stringYear = String(randomYear).padStart(2, '0');
  const stringMonth = String(randomMonth).padStart(2, '0');
  const stringDay = String(randomDay).padStart(2, '0');
  const datePart = stringYear + stringMonth + stringDay;
  let randomPart = String(Math.floor(Math.random() * 9999)).padStart(4, '0');
  let PESELwithoutCheckDigit = datePart + randomPart;
  splitPESELwCD = PESELwithoutCheckDigit.split('');
  const checkSum = weights.reduce((prev, curr, index) => 
    prev + (Number(splitPESELwCD[index]) * curr), 0);
  const checkDigit = String(10 - checkSum).slice(-1);
  const randomPESEL = PESELwithoutCheckDigit + checkDigit;
  return randomPESEL;
}