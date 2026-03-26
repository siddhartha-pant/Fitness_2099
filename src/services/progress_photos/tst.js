Promise.resolve("X")

  .then((val) => {
    console.log(2, val);

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(3);

        resolve("Y");
      }, 0);
    });
  })

  .then((val) => {
    console.log(4, val);

    return "Z";
  })

  .then(console.log);
setTimeout(() => {
  console.log(5);
}, 0);
console.log("end");
