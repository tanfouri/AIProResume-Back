
const Cv = require('../models/cv');
const generateTextFunction = require('../utils/generateText');
const express = require("express");
const app = express();
const cors = require("cors");




app.use(express.json());
app.use(cors());
//create CV
const createCv =  async (req, res) => {
  const {
    fullName,
    email,
    address,
    phoneNumber,
    currentPosition,
    currentLength,
    currentTechnologies,
    workHistory,
    education,
    userEmail
  } = req.body;

  const workArray = JSON.parse(workHistory)
  const educationArray=JSON.parse(education)
  const newEntry = {
    fullName,
    email,
    address,
    phoneNumber,
    image_url: `http://localhost:3001/uploads/${req.file.filename}`,
    currentPosition,
    currentLength,
    currentTechnologies,
    workHistory: workArray,
    education: educationArray ,
    userEmail
  };

  //const prompt1 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write a 100 words description for the top of the resume(first person writing)?`;
const prompt1=`**I'm a ${currentPosition} with ${currentLength} years of experience, passionate about ${currentTechnologies}.** Can you craft a compelling 70-word description for my resume's top section, written in the first person?`;
  // const prompt2 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write 10 points for a resume on what I am good at?`;
const prompt2=`**I'm ${fullName}, a ${currentPosition} with ${currentLength} years of experience in ${currentTechnologies}.** Could you please brainstorm 7 hyphen compelling showcasing my strongest skills and proficiencies for my resume ?`;
  const remainderText = () => {
    let stringText = "";
    for (let i = 0; i < workArray.length; i++) {
      stringText += ` ${workArray[i].name} as a ${workArray[i].position} : ${workArray[i].startDate} - ${workArray[i].endDate}.`;
    }
    return stringText;
  };
  const remainderText2 = () => {
    let stringText2 = "";
    for (let i = 0; i < educationArray.length; i++) {
      stringText2 += ` ${educationArray[i].university} as a ${educationArray[i].specialization} : ${educationArray[i].startDate} - ${educationArray[i].endDate}.`;
    }
    return stringText2;
  };
/*
  const prompt3 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n During my years I worked at ${
    workArray.length
  } companies. ${remainderText()} \n
  my study journey includes the following experiences:${remainderText2()} .\n Can you write me 50 words for each company seperated in numbers of my succession in the company (in first person)?`;
*/
const prompt3 = `**I'm crafting my resume, highlighting my ${currentLength} years of experience as a ${currentPosition}. I've worked at ${workArray.length} companies and completed several educational milestones. Could you please generate engaging 50-word descriptions for each company listed below, written in first person ?

Work History:
${remainderText()}
(without * and numbres only -)
`
  try {
    const objective = await generateTextFunction(prompt1);
    const keypoints = await generateTextFunction(prompt2);
    const jobResponsibilities = await generateTextFunction(prompt3);

    const chatData = { objective, keypoints, jobResponsibilities };
    const data = { ...newEntry, ...chatData };

    const newCv = new Cv(data);
    await newCv.save();
console.log(data);
    res.status(200).json({
      message: "CV created successfully!",
      data: newCv,
    });
  } catch (error) {
    console.error('Error generating text:', error.message);
    res.status(500).json({ error: "Failed to generate text" });
  }
};
//get ALL CV
 
const getCv = async (req, res) => {
  try {
    const { userEmail } = req.query;

    if (!userEmail) {
      return res.status(400).json({ error: 'Email is required for filtering les CV.' });
    }

    const listCv = await Cv.find({userEmail})

   if (!listCv.length) {
      return res.status(404).json({ error: 'No cv found for the provided email.' });
    }

    res.json(listCv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//delete Cv by id 


const deleteCv =  async (req, res) => {
  const { id } = req.params;

  try {
    
    const deletedCv = await Cv.findByIdAndDelete(id);

    if (!deletedCv) {
      return res.status(404).json({ error: 'Cv not found' });
    }

    // Send a success response
    res.status(200).json({ message: 'Cv deleted successfully' });
  } catch (error) {
    console.error('Error deleting Cv:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//update Cv

const updateCv = async (req, res) => {
  const { id } = req.params;
  const { 
  fullName ,
  
  currentPosition ,
  currentLength ,
  currentTechnologies ,
  workHistory,
  objective,
  keypoints,
  education,
  jobResponsibilities } = req.body;
  const workArray = JSON.parse(workHistory)
  const educationArray=JSON.parse(education)

  try {
    const updteCv = await Cv.findById(id);

    if (!updteCv) {
      return res.status(404).json({ error: 'Cv not found' });
    }
   if (req.file.filename ) 
   {updteCv.image_url= `http://localhost:3001/uploads/${req.file.filename}`;}
    updteCv.fullName = fullName;
   // updteCv.image_url= `http://localhost:3001/uploads/${req.file.filename}`;
    updteCv.currentPosition=currentPosition ;
    updteCv.currentLength=currentLength;
    updteCv.currentTechnologies=currentTechnologies ;
    updteCv.workHistory=workArray;
    updteCv.objective=objective;
    updteCv.keypoints=keypoints;
    updteCv.jobResponsibilities=jobResponsibilities;
    updteCv.education=educationArray;

    const updatedCv = await updteCv.save();
    res.status(200).json(updatedCv); // Sending only the updatedCv as a response
  } catch (error) {
    console.error('Error updating cv:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { createCv,getCv ,deleteCv , updateCv};