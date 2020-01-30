require('dotenv').config();
const prompt = require('prompt');
const mongoose = require('mongoose');
const Admin = require('./models/admin.model');
const createIndex = require('./elasticClient/createIndex');

console.log('Press Ctrl + C to quit at any time if the process hangs!');

var prompt_attributes = [
  {
      name: 'email',
      message: 'Email with which you would like to login to dashboard',
      hidden: false
  }
];

prompt.start();

prompt.get(prompt_attributes, async (err, result) => {
  if (err) {
    console.error(err);
  } else {
    const {MONGO_URI, ELASTIC_URL} = process.env;
    if (!MONGO_URI || !ELASTIC_URL) {
      console.log('MONGO_URI and ELASTIC_URL is required in the .env file. Please specify it!');
      return;
    }

    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
        useFindAndModify: false
    });
    } catch (error) {
      console.log('Error while connecting to mongodb! Please check the MONGO_URI in .env');
      console.error(error);
      return;
    }
  }

  try {
    if (!result.email || !result.email.trim()) {
      console.log('Email cannot be empty!');
      return;
    }
    await Admin.create({email: result.email});
    console.log('Email assigned to admin access!');
  } catch (error) {
    console.log('Cannot insert email to admins collection!');
    console.error(error);
    return;
  }

  try {
    await createIndex();
  } catch (error) {
    console.log('Cannot create index post in elasticsearch cluster!');
    console.error(error);
  }
  console.log('Done! Press Ctrl + C to quit!');
});
