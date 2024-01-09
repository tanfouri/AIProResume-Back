const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
	
    fullName :{ type: String, required: true },
    email:{ type: String, required: true },
    address:{ type: String, required: true },
    phoneNumber:{ type: String, required: true },
    image_url: { type: String, required: true },
    currentPosition :{ type: String, required: true },
    currentLength : { type: String, required: true },
    currentTechnologies : { type: String, required: true },
    workHistory: { type: Array , required: true },
    education: { type: Array , required: true },
    objective:{ type: String, required: true },
    keypoints:{ type: String, required: true },
    jobResponsibilities:{ type: String, required: true },
    userEmail:{ type: String, required: true },
   
},
    {
   
        timestamps: true
    

});



module.exports = mongoose.model('Cv', cvSchema)