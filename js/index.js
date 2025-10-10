"use strict"

const gridContainer = document.querySelector('.grid-container');
const projectNames = ['typescript-virtual-keyboard', 'guitar-chord-names', 'tarp-configs'];

// Fetch data for a user and a specific repo
async function getUserRepos(userName, repoName) {
  try {
    const res = await fetch(`https://api.github.com/repos/${userName}/${repoName}`);
    const data = await res.json();
    createProjectCards(data)
  } catch (error) {
    console.error(error);
  }
}

// Create the projects cards and append the data to the DOM
function createProjectCards(obj) {
  const div = document.createElement('div');
  div.className = 'project';

  const h3 = document.createElement('h3');
  h3.className = 'project-title';

  const a = document.createElement('a');
  a.className = 'project-link';
  a.setAttribute('target', '_blank');
  a.setAttribute('href', obj.html_url);

  const projectTitle = obj.name
    .split('-')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
    
  a.append(document.createTextNode(projectTitle));

  h3.append(a);

  const p = document.createElement('p');
  p.className = 'project-desc';
  p.append(document.createTextNode(obj.description));

  div.append(h3);
  div.append(p);

  gridContainer.append(div)
}

// Call the fetch function for each repo
function projects(str, arr) {
  arr.forEach(item => getUserRepos(str, item));
}
projects('Kernix13', projectNames);
