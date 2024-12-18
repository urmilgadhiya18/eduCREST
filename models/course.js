import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true, trim: true },
  url: { type: String, required: true },
  transcript: { type: String },
},{ _id: false });

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  instructor: { type: String, required: true, trim: true },
  duration: { type: String, required: true, trim: true },
  students: { type: Number, required: true, min: 0 },
  image: { type: String, required: true },
  videos: [videoSchema],
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
