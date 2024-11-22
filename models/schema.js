const { register } = require("module");
const mongoose = require("mongoose");
// ikada em  ivali antehy for suppose nee job hub lo person register avaniki em em fields chupistunav frontend lo?name mail pass
const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  Gender: String,
  mobileNumber: String, //rey
  //   jobRole: String,
});
//ila database lo em em store chesukuntunav ani schema rastav
//mongo application open chesi new connection establish chesthar kada utube lo alane chepthunnadu localhost lo i mean okatey connection mongodb atlas ani inkoti untadi dani lo nuv different dbs create cheskoni dini dwara connect avagalavu anthey nuv ippudu alreayd connection chesnav kabathi malli connection akarldhu ohoo
const registerUserss = mongoose.model("registeredUserss", schema); //chi dinivala haa second paramaeter schema undali
module.exports = registerUserss;
//anthey dini use cheskoni nuv find delte create rastav haa ippudu ivvi db lo ela kanpisthai
