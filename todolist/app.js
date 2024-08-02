import { fetchJSON } from "./fonction/api.js";

const todos = await fetchJSON('https://jsonplaceholder.typicode.com/todos?_limit=5');
console.log(todos)