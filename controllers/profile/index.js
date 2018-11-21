const profileTest = require('./profileTest');
const getProfile = require('./getProfile');
const getAllProfiles = require('./getAllProfiles');
const getByHandle = require('./getByHandle');
const getById = require('./getById');
const addEditProfile = require('./addEditProfile');
const addExperience = require('./addExperience');
const addEducation = require('./addEducation');
const deleteExperience = require('./deleteExperience');
const deleteEducation = require('./deleteEducation');
const deleteUserAndProfile = require('./deleteUserAndProfile');

module.exports = {
  profileTest,
  getProfile,
  getAllProfiles,
  getByHandle,
  getById,
  addEditProfile,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation,
  deleteUserAndProfile
};