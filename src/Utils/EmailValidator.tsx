const ValidateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Enhanced email validation regex
  return emailRegex.test(email);
};

export default ValidateEmail;
