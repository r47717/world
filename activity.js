const actions = ['move', 'eat', 'sleep', 'birth'];
const activity_profile_map = {
  'sleepy': [44, 15, 40, 2],
  'active': [64, 15, 20, 3],
};
const activity_profiles = Object.keys(activity_profile_map);

module.exports = {
  actions,
  activity_profile_map,
  activity_profiles,
};
