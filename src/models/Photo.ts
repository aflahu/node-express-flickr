import { IPhoto } from "../interfaces/models/photo";
import mongoose from "../providers/Database";

export interface IPhotoModel extends IPhoto, mongoose.Document {}

export const PhotoSchema = new mongoose.Schema<IPhotoModel>({
  title: { type: String },
  link: { type: String, unique: true },
  media: { type: Array },
  date_taken: { type: String },
  description: { type: String },
  published: { type: String },
  author: { type: String },
  author_id: { type: String },
  tags: { type: String },
});

const Photo = mongoose.model<IPhotoModel>("Photo", PhotoSchema);

export default Photo;
