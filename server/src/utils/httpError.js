// Small helper so services can throw errors that errorHandler knows how
// to translate into a status code + safe-to-show message.
export function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  err.expose = true;
  return err;
}
