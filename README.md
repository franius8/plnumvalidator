# PL Num Validator
This package is intended to provide validators for various Polish identification numbers together with an option for generating random correct number.

Currently only the PESEL number is supported.

The package offers the following functions:

  1. validatePESEL,
  2. getBirthDatefromPESEL,
  3. generateRandomPESEL.

## validatePESEL

### Description

This function offers an extended validation of the PESEL number.

The following checks are performed in order:

  1. whether the argument is in the correct format,
  2. whether the birth date specified in the number has already passed,
  3. whether the birth month is valid,
  4. whether the birth month contained the day of birth (to exclude days such as February 30th),
  5. whether the check digit is valid.

### Input

The functions accepts only string arguments with 11 digit characters. PESEL numbers for people born after 1899 and up to the current year are supported.

Number argument **are not supported** as the PESEL number may contain leading zeroes. 

### Output

The function returns a boolean value indicating whether the provieded nunber is valid.

## getBirthDatefromPESEL

This function extracts the birth date from a PESEL number. The number is validated first using the validatePESEL and supplying invalid number will result in an error.

### Input

The functions accepts only string arguments with 11 digit characters. PESEL numbers for people born after 1899 and up to the current year are supported.

Number argument **are not supported** as the PESEL number may contain leading zeroes.

### Output

The function returns JavaScript Date object with the extracted date.

## generateRandomPESEL

The function generates a random, valid PESEL number

### Input

Currently the function does not accept any arguments. Customisation options are planned.

### Output

The function return a string containing a PESEL number for a person of random sex born between 1900 and the current year.