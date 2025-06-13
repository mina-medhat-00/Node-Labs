import fs from "fs";

const studentData = [
  {
    id: 1,
    name: "Alice Johnson",
    age: 20,
    course: "Computer Science",
    grades: {
      math: 90,
      programming: 95,
    },
  },
  {
    id: 2,
    name: "Bob Smith",
    age: 22,
    course: "Data Science",
    grades: {
      statistics: 88,
      machine_learning: 92,
    },
  },
  {
    id: 3,
    name: "Carol Williams",
    age: 21,
    course: "Web Development",
    grades: {
      html: 95,
      javascript: 89,
    },
  },
];

// 1.Write Operations
fs.writeFile("students.json", JSON.stringify(studentData), "utf8", (err) => {
  if (err) {
    console.error("an error occurred", err);
  } else {
    console.log("students updated successfully");
  }
});

try {
  fs.writeFileSync("students.json", JSON.stringify(studentData), "utf8");
  console.log("students updated successfully");
} catch (err) {
  console.error("an error occurred", err);
}

// 2.Read Operations
fs.readFile("students.json", (err, data) => {
  if (err) throw err;
  console.log(JSON.parse(data));
});

const dataSync = fs.readFileSync("students.json");
const studentsSync = JSON.parse(dataSync);
console.log(studentsSync);

// 3. Add a new student
const newStudent = {
  id: 4,
  name: "David Adams",
  age: 25,
  course: "Software Testing",
  grades: {
    java: 83,
    selenium: 77,
  },
};

const dataToAdd = fs.readFileSync("students.json");
const dataToAddJSON = JSON.parse(dataToAdd);

dataToAddJSON.push(newStudent);

fs.writeFile("students.json", JSON.stringify(dataToAddJSON), (err) => {
  if (err) {
    console.error("error updating file", err);
  } else {
    console.log("students updated successfully");
  }
});

try {
  fs.writeFileSync("students.json", JSON.stringify(dataToAddJSON));
  console.log("students updated successfully");
} catch (err) {
  console.error("error updating file", err);
}

// Bonus
// 4. Update a Students's Course
const studentId = 2;
const dataBonus = fs.readFileSync("students.json");
const dataBonusJSON = JSON.parse(dataBonus);

dataBonusJSON.map((student) => {
  if (student.id === studentId) student.course = "New Course";
});

fs.writeFile("students.json", JSON.stringify(dataBonusJSON), (err) => {
  if (err) {
    console.error(`error updating student with id ${studentId}`, err);
  } else {
    console.log(`student with id ${studentId} updated successfully`);
  }
});

try {
  fs.writeFileSync("students.json", JSON.stringify(dataBonusJSON));
  console.log(`student with id ${studentId} updated successfully`);
} catch (err) {
  console.error(`error updating student with id ${studentId}`, err);
}

// 5. Delete a Student
const result = dataBonusJSON.filter((student) => student.id !== studentId);

fs.writeFile("students.json", JSON.stringify(result), (err) => {
  if (err) {
    console.error(`error deleting student with id ${studentId}`, err);
  } else {
    console.log(`student with id ${studentId} deleted successfully`);
  }
});

try {
  fs.writeFileSync("students.json", JSON.stringify(dataBonusJSON));
  console.log(`student with id ${studentId} deleted successfully`);
} catch (err) {
  console.error(`error deleting student with id ${studentId}`, err);
}

// Compare the behavior of sync vs async operations

// Synchronous Operations:
// Definition: Executes code line by line in a blocking manner.
// Blocking: Each operation must complete before the next one starts.
// Example: Reading a file synchronously with fs.readFileSync()

// Asynchronous Operations:
// Definition: Executes code without waiting for each operation to finish.
// Non-blocking: continues running other code while waiting for async tasks to complete.
// Example: Reading a file asynchronously with fs.readFile()
