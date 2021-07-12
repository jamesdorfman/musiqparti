import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // spotify user id
    spotifyId: {
      type: String,
      required: true,
      unique: true,
    },
    // main playlist of user
    playlistId: {
      type: String,
      required: false,
    },
    // bio of user
    bio: {
      type: String,
      required: false,
    },
    // facebook social media id
    facebookId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
