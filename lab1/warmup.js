const users = [
  { name: "John Doe", age: 28, role: "developer" },
  { name: "Jane Smith", age: 32, role: "admin" },
  { name: "Bob Johnson", age: 24, role: "developer" },
  { name: "Sarah Williams", age: 27, role: "manager" },
  { name: "Mike Brown", age: 35, role: "admin" },
];

const above30 = users.filter((user) => user.age > 30);
const namesOnly = users.map((user) => user.name);
const firstAdmin = users.find((user) => user.role === "admin");
const lastAdmin = users.findLast((user) => user.role === "admin");

const deepCpy = (arr) => JSON.parse(JSON.stringify(arr));
const deepCpyArr = deepCpy(users);

deepCpyArr.map((user) => (user.name = "User"));

console.log(deepCpyArr, users);
