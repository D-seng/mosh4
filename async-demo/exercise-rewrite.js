
async function emailCustomer() {
  try {
    const customer = await getCustomer(1);
    console.log('Customer:', customer);
    if (customer.isGold) {
      const topMovies = await getTopMovies(customer);
      console.log('Top movies:', topMovies);
      const email = await sendEmail(customer.emailAddr, topMovies);
      console.log('Sending email to', customer.emailAddr);
    }
  }
  catch (err) {
    console.log('Error', err.message);
  }
};

emailCustomer();

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: id, 
        emailAddr: 'customer@gmail.com', 
        isGold: true})
    }, 4000);
  })
}

function getTopMovies(customer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let movies = ['movie1', 'movie2'];
      resolve(movies);
    }, 4000);
  })
}

function sendEmail(email, movies) {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 4000);
  })
}