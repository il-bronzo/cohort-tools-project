const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortSchema = new Schema(
  {
    cohortSlug: { type: String, unique: true, required: true },
    cohortName: { type: String, required: true },
    program: {
      type: String,
      enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
    },
    format: { type: String, enum: ["Full Time", "Part Time"] },
    campus: {
      type: String,
      enum: [
        "Madrid",
        "Barcelona",
        "Miami",
        "Paris",
        "Berlin",
        "Amsterdam",
        "Lisbon",
        "Remote",
      ],
    },
    startDate: {type: Date, default: Date.now},
    endDate: Date,
    inProgress: {type: Boolean, default: false},
    programManager: {type: String, required: true},
    leadTeacher: {type: String, required: true},
    totalHours: {type: Number, default: 360}
  },
  { timestamps: true }
);

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;

//Example from lesson:
/* 
// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const bookSchema = new Schema(
	{
		title: String,
		year: Number,
		codeISBN: { type: String, maxlength: 13, unique: true },
		quantity: { type: Number, min: 0, default: 0 },
		lastPublished: { type: Date, default: Date.now },
		//only accepts the following strings:
		genre: {
			type: String,
			enum: ["romance", "fiction", "biography", "poetry"],
		},
		author: {
			// <== UPDATE
			type: Schema.Types.ObjectId,
			ref: "Author", // "Author" is the model to which we are creating a reference relationship
		},
	},
	{ timestamps: true }
);

// CREATE MODEL
// The model() method defines a model (Book) and creates a collection (books) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Book" --> "books"
const Book = mongoose.model("Book", bookSchema);

// EXPORT THE MODEL
module.exports = Book;
*/
