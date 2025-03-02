import Hashids from "hashids";

export const generateHashFromEmail = (email: string) => {
  const hashids = new Hashids(email, 8);

  const emailAsNumber = email
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return hashids.encode(emailAsNumber);
};
