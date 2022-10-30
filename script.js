const PLNumValidator = (() => {
  const validatePESEL = (PESEL) => {
    if (typeof PESEL !== "string") {
      throw ('Invalid argument type. Validator only accepts strings. See docs for more info.')
    } else if (PESEL.length !== 11) {
      throw (`Argument length invalid, 11 characters expected, ${PESEL.length} provided.`);
    } else if (!/^\d+$/.test(PESEL)) {
      throw ('Argument containts invalid characters. Only digits are allowed.');
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
  return { validatePESEL };
})();

export default PLNumValidator;