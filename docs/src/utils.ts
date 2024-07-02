function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1)
}

function CamelCase(str: string) {
  return str.split("-").map(capitalize).join(" ")
}

function kebabCase(str: string) {
  return str
    .split(" ")
    .map(String.prototype.toLowerCase)
    .join("-")
}

export {
  capitalize,
  CamelCase,
  kebabCase
}