export function validateOTP(otp) {
  const re = /([0-9]+)/;
  return re.test(otp);
}
