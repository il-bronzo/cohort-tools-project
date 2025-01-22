const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const studentSchema = new Schema (
	{
		firstName: String, 
		lastName: String, 
		email: String, 
		phone: String, 
		linedinUrl: String, 
		languages: {
			type: Array, 
			enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"]
		},
		program: String, 
		background: String, 
		image: String, 
		cohort: {
			type: Schema.Types.ObjectId,
			ref: "Cohort"
		},
		projects: Array, 

}, 
	{timestamp: true}
)

//CREATE MODEL
const Student = mongoose.model("Student", studentSchema)

// EXPORT THE MODEL
module.exports = Student;