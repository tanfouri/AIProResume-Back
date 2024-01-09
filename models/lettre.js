const mongoose = require("mongoose");

const lettreSchema = new mongoose.Schema({
	fullname: { type: String, required: true },
	company: { type: String, required: true },
	skills: { type: String, required: true },
	email: { type: String, required: true },
	description: { type: String, required: true },
	generatedLettre: { type: String, required: false },
	phone: { type: String },
	recruiterName :{ type: String},
	companyAddress :{ type: String}, 
	languageLetter:{ type: String},
	recipientName:{ type: String},
	emailLettre:{ type: String}

},{
   
        timestamps: true
    

});



module.exports = mongoose.model('Lettre', lettreSchema)