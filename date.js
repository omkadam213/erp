let today = new Date(); // current date
let month = today.getMonth() + 1;
console.log(month);
let end = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(); // end date of month
let result = [];

for (let i = 1; i <= end; i++) {
  result.push(
    today.getFullYear() +
      "-" +
      (today.getMonth() + 1 < 10 ? "0" + month : month) +
      "-" +
      (i < 10 ? "0" + i : i)
  );
}

module.exports = {
    result
}
