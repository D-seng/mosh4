// console.log('Before');
// getUser(1, getRepositories); 
// getRepositories(user.gitHubUsername, getCommits);
// getCommits(repo, displayCommits);

// console.log('After');

getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log('Commits', commits))
  .catch(err => console.log('Error', err.message))

function getUser(id) {
 return new Promise((resolve, reject) => {
   setTimeout(() => {
     resolve( { id: id, gitHubUsername: 'mosh' })
   }, 2000);
 })
}

function getRepositories(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['repo1', 'repo2'])
    }, 2000);
  })
}
  
function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    resolve(['commit1'])}, 2000);
  })
}
