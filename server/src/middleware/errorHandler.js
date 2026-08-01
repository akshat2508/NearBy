// Centralized error handler. Keep this last in the middleware chain.
export function errorHandler(err, req, res, _next) {
  // eslint-disable-next-line no-console
  console.error(err);

  if (err.name === "ZodError") {
    return res.status(400).json({
      error: "Invalid request",
      issues: err.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message })),
    });
  }

  const status = err.status ?? 500;
  const message = err.expose ? err.message : "Internal server error";

  res.status(status).json({ error: message });
}
