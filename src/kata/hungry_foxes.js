function hungryFoxes(farm) {
  let arr = [];
  let temp = "";

  for (let i = 0; i < farm.length; i++) {
    if (farm[i] === "[") {
      if (temp) {
        arr.push(temp);
        temp = "";
      }
      let cage = "";
      i++;
      while (farm[i] !== "]") {
        cage += farm[i];
        i++;
      }
      arr.push("[" + cage + "]");
    } else {
      temp += farm[i];
    }
  }
  if (temp) arr.push(temp);

  const processCage = (cage) => {
    const inner = cage.slice(1, -1);
    if (inner.includes("F")) {
      return "[" + inner.replace(/C/g, ".") + "]";
    }
    return "[" + inner + "]";
  };

  const processField = (field) => {
    return field.replace(/C/g, ".");
  };

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].startsWith("[")) {
      arr[i] = processCage(arr[i]);
    } else {
      arr[i] = processField(arr[i]);
    }
  }

  return arr.join("");
}
