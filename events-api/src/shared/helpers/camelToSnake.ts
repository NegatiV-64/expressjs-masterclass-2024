export function camelToSnake(str:string) {
  return str.replace(/[A-Z]/g, (c) => {return '_' + c.toLowerCase()});
}