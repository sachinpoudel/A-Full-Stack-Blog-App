import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: {
      type: String
    },
    image: {
      type: String
    }
  },
  publishedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});
const Blog = mongoose.model("Blog", blogSchema);
export default Blog;