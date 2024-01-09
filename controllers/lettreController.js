
const Lettre = require('../models/lettre')
const generateDescription = require('../utils/generateText')

//get all Lettres

const lettreGet = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email is required for filtering letters.' });
    }

    const lettres = await Lettre.find({ email });

    if (!lettres.length) {
      return res.status(404).json({ error: 'No letters found for the provided email.' });
    }

    res.json(lettres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// create new lettre

const createLettre = async (req, res) => {
    const { fullname,company, skills,description , email , phone, 
      recruiterName,
      companyAddress, 
      languageLetter,
      recipientName,
      emailLettre
     } = req.body;
   
    
   // const prompt3 = `I am writing lettre de motivation based in this information ${description} +my name:${fullname}+i can do :${skills}+ company name :${company}`;
   const prompt1 = `Génère une lettre en  ${languageLetter} de motivation professionnelle
    et complète, en utilisant les informations que j'ai fournies :

   Nom complet : ${fullname}
   Numéro de téléphone : ${phone}
   E-mail : ${emailLettre}
   Entreprise souhaitée : ${company}
  
   Nom du recruteur : ${recruiterName}
   
   Adresse de l'entreprise : ${companyAddress}
  
   Nom du destinataire : ${recipientName}
   Compétences et qualifications : ${skills}
   Introduction personnelle : ${description}`; 
   const generatedLettre=await generateDescription(prompt1);

   
    const newLettre = { fullname, company,
      skills,email,description,generatedLettre ,
       recruiterName,
      companyAddress, 
      languageLetter,
      recipientName,
      emailLettre,
      phone}
    const lettre = await Lettre.create(newLettre)
    res.status(200).send('lettre created')
}

//update Lettre

const updateLettre = async (req, res) => {
  const { id } = req.params;
  const  { fullname, company,skills, description,generatedLettre , recruiterName,
    companyAddress, 
    languageLetter,
    recipientName,
    emailLettre , phone} = req.body;

  try {
    const lettre = await Lettre.findById(id);

    if (!lettre) {
      return res.status(404).json({ error: 'Lettre not found' });
    }

    lettre.fullname = fullname;
    lettre.company = company;
    lettre.skills = skills;
    lettre.description = description;
    lettre.generatedLettre = generatedLettre;
    lettre.recruiterName=recruiterName;
    lettre.languageLetter=languageLetter;
    lettre.companyAddress=companyAddress;
    lettre.recipientName=recipientName;
    lettre.emailLettre=emailLettre;
    lettre.phone=phone;
    const updatedLettre = await lettre.save();
    res.status(200).json(updatedLettre); // Sending only the updatedLettre as a response
  } catch (error) {
    console.error('Error updating lettre:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//delete lettre
const deleteLettre =  async (req, res) => {
  const { id } = req.params;

  try {
    // Use Mongoose to find and delete the lettre by ID
    const deletedLettre = await Lettre.findByIdAndDelete(id);

    if (!deletedLettre) {
      return res.status(404).json({ error: 'Lettre not found' });
    }

    // Send a success response
    res.status(200).json({ message: 'Lettre deleted successfully' });
  } catch (error) {
    console.error('Error deleting lettre:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { lettreGet, createLettre, updateLettre ,deleteLettre}