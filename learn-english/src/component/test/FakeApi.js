import { topicArray } from "../view/example/Topics";

export function apiTopic() {
  setTimeout(() => {
    getRandomObject(topicArray);
  }, 1000);
}

function getRandomObject(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
