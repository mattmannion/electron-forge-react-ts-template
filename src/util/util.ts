export function CatchError(error: unknown) {
  console.log((<Error>error).message);
}
