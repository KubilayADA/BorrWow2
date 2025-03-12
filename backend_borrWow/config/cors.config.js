const allowedOrigins = [
    // Local development
    "http://localhost:5173", // Vite default
    "http://127.0.0.1:5173",
    
    // Your production frontend URL
    "https://borrwow2-1-jqmk.onrender.com/",
    
    // Render preview deployments
    /\.onrender\.com$/ // Allow any Render deployment
  ];
  
  const corsOptions = {
    origin: (origin, callback) => {
      console.log("Received Origin:", origin); // Debug logging
      
      // Allow requests with no origin (e.g., mobile apps, Postman)
      if (!origin || allowedOrigins.some(allowedOrigin => {
        if (typeof allowedOrigin === "string") {
          return origin === allowedOrigin;
        }
        return allowedOrigin.test(origin);
      })) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
  };
  
  module.exports = corsOptions;