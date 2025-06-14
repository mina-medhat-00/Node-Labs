const requestDetailsLogger = (req, _, next) => {
  const route = req.originalUrl;
  const method = req.method;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}]: ${method} ${route}`);
  next();
};

export default requestDetailsLogger;
