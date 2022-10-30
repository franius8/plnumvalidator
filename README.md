# PL Num Validator
This package is intended to provide validators for various Polish identification numbers together with an option for generating random correct number.

Currently only the PESEL number is supported.

The package offers the following functions:

  1. validatePESEL

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

The functions accepts only string argument with 11 digit characters.

Number argument **are not supported** as the PESEL number may contain leading zeroes. 

### Output

The function return a boolean value indicating whether the provieded nunber is valid.
