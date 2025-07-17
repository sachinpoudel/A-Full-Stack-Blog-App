export const verificationCode = () => {
  // Generate a random verification token
  const token = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return token;
};