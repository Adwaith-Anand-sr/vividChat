import CryptoJS from 'crypto-js';

const generateChatId = (participants) => {
  const participantsString = participants.sort().join("-");
  const uniqueString = `${participantsString}`;
  const hash = CryptoJS.SHA256(uniqueString).toString(CryptoJS.enc.Hex);
  return hash.substring(0, 20);
};

export default generateChatId;
