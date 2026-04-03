const contactRoutes = require('./contactRoutes');
const contactService = require('./contactService');

module.exports = {
  contactRoutes,
  ...contactService
};