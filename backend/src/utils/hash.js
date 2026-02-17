import bcrypt from "bcrypt";

export const hashPassword = async (pw) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(pw, salt);
};

export const comparePassword = async (pw, hash) => {
  return bcrypt.compare(pw, hash);
};
