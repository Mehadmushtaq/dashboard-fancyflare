// Error codes
export const ErrorCode = {
  success: 0,
  updated: 1,
  failed: 2,
  exist: 3, // not in use rn
  not_exist: 4,
  exception: 5,
  not_verified: 6,
  token_required: 7,
  token_invalid: 8,
  time_out: 9,
  invalid_cred: 10,
  invalid_password: 11,
  invalid_code: 13,
  sent: 1,
  password_exist: 15,
  password_not_exist: 16,
};

// error messages

export const ErrorMessages = {
  network_error: "Network error. Please check your network connection.",
  success: "Operation successful",
  updated: "Data updated successfully",
  failed: "Some server error occured. Please try again later.",
  exist: "User already exist", // not in use rn
  not_exist: "Phone number not exist",
  exception: 5,
  not_verified: "User not verified",
  token_required: "Token required. Login again please",
  token_invalid: "Session Expired.",
  time_out: "Timed Out",
  invalid_credentials: "Phone number or password is incorrect",
  invalid_password: "Invalid Password",
  seeker_not_exist: 12,
  invalid_code: "Invalid code.",
  sent: 1,
  password_exist: 15,
  password_not_exist: 16,
  not_sent_invitation_yet: 17,
  relation_not_provided: 18,
  selfie_identification: 19,
  user_is_not_guardian: "Gaurdian phone already exist as seeker",
  user_is_not_seeker: "Seeker phone already exist as gaurdian",
  verified: "Phone number already exist", //already exist and verified but incomplete profile
  verified_seeker: "Seeker's phone number already exist",
  incomplete_profile: "Your profile information is missing", //already exist and verified for gaurdian
  invalid_password_format:
    "Password should contain atleast 8 Characters 1 number and 1 special character",
};
