/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

  Once you've implemented the logic, test your code by running
  - `npm run test-anagram`
*/

function isAnagram(str1, str2) {
  const map1 = new Map();
  let res = true;
  str1.split("").forEach((letter) => {
    if (letter != " ") {
      if ((letter >= "a" && letter <= "z") || (letter >= "A" && letter <= "Z"))
        letter = letter.toLowerCase();
      let prevCount = map1.get(letter);
      if (prevCount === undefined) {
        map1.set(letter, 1);
      } else map1.set(letter, prevCount + 1);
    }
  });
  console.log(map1);
  str2.split("").forEach((letter) => {
    if (letter != " ") {
      if ((letter >= "a" && letter <= "z") || (letter >= "A" && letter <= "Z"))
        letter = letter.toLowerCase();
      let prevCount = map1.get(letter);
      if (prevCount === undefined) {
        map1.set(letter, -1);
      } else map1.set(letter, prevCount - 1);
    }
  });
  map1.forEach((value) => {
    if (value > 0 || value < 0) {
      res = false;
      return;
    }
  });
  return res;
}
isAnagram("black car", "car black");
module.exports = isAnagram;
