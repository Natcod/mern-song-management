import mongoose, { Document, Schema } from 'mongoose';

export interface ISong extends Document {
  title: string;
  artist: string;
  album: string;
  genre: string;
  createdAt: Date;
  updatedAt: Date;
}

const songSchema = new Schema<ISong>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    artist: {
      type: String,
      required: [true, 'Artist is required'],
      trim: true,
    },
    album: {
      type: String,
      required: [true, 'Album is required'],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, 'Genre is required'],
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
songSchema.index({ genre: 1 });
songSchema.index({ artist: 1 });
songSchema.index({ album: 1 });

export const Song = mongoose.model<ISong>('Song', songSchema);
