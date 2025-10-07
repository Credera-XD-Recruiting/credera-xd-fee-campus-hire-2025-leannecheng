const getInitials = (fullName) => {
  const [first, last] = fullName.split(" ");
  return (first[0] + last[0]).toUpperCase();
};