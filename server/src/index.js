import "dotenv-safe/config.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import spotifyRoutes from "./routes/spotify.js";
import userRoutes from "./routes/user.js";
import mongoose from "mongoose";

const main = async () => {
  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );
  app.use(cookieParser());

  app.use(express.json({ limit: "16mb" }));
  app.use(express.urlencoded({ limit: "16mb", extended: true }));

  app.use("/spotify", spotifyRoutes);
  app.use("/user", userRoutes);

  await mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.set("useFindAndModify", false);

  app.listen(process.env.PORT, () =>
    console.log(`Server running on port: ${process.env.PORT}`)
  );
};

main().catch((err) => {
  console.error(err);
});
