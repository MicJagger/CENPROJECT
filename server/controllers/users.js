const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const Business = require('../models/business');
const Customer = require('../models/customer');
const Authentication = require('../models/authentication')

async function createAuth (accType, username, password){
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  
  const auth = new Authentication({
    username,
    passwordHash,
    accType
  });
  
  const login = await auth.save();
  return login;
}

usersRouter.post('/businesses', async (request, response) => {
    // Post a new business user account
    const { username, password } = request.body;
    if (!password || !username) {
      return response.status(400).json({ error: 'a username and password are required' });
    }

    const { businessName, address, zipCode, city, state, email, phoneNumber, availability } = request.body;
    if (!businessName || !address || !zipCode || !city || !state || !email || !phoneNumber || !availability) {
      return response.status(400).json({ error: 'missing field(s) when creating a business account' });
    }

    const type = 'business'
    const login = await createAuth(type, username, password);

    avStr = JSON.stringify(availability)

    const user = new Business({
      businessName, 
      address,
      zipCode,
      city,
      state, 
      email,
      phoneNumber,
      availability: avStr,
      avgRating: undefined,
      login: login._id
    })

    await user.save()
    response.status(201).json(login);
});

usersRouter.post('/customers', async (request, response) => {
  // Post a new customer user account
  const { username, password } = request.body;
  if (!password || !username) {
    return response.status(400).json({ error: 'a username and password are required' });
  }

  const { firstName, lastName, address, zipCode, city, state, email, phoneNumber } = request.body;
  if ( !firstName || !lastName || !address || !zipCode || !city || !state || !email || !phoneNumber) {
    return response.status(400).json({ error: 'missing field(s) when creating a customer account' });
  }

  const type = 'customer'
  const login = await createAuth(type, username, password);

  const user = new Customer({
    firstName, 
    lastName,
    address,
    zipCode,
    city,
    state, 
    email,
    phoneNumber,
    login: login._id
  })

  await user.save()
  response.status(201).json(login);
});
  
usersRouter.get('/', async (request, response) => {
    // Get all logins
    const logins = await Authentication.find({});
    response.json(logins);
});

usersRouter.get('/businesses', async (request, response) => {
  // Get all business accounts
  const providers = await Business.find({});
  response.json(providers);
});

usersRouter.get('/customers', async (request, response) => {
  // Get all customer accounts
  const providers = await Customer.find({});
  response.json(providers);
});

module.exports = usersRouter;