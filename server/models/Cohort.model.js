const mongoose = require("mongoose");
const Schema = mongoose.Schema;


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