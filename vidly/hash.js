const bcrypt = require('bcryptjs');

async function run() {
  const salt = await bcrypt.genSalt(11);
  const hashed = await bcrypt.hash('jkii', salt)
  console.log(salt);
  console.log(hashed);
}
run();