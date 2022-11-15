//create DOM variables
const input = document.querySelector('#input');
const search = document.querySelector('#search')
const defList = document.querySelector('#list')
const failed = document.querySelector('#fail')
let word = ''
let wordUrl = ``


search.addEventListener('click', wordSearch)

// async function used in a click event listener do add definitions to page
async function wordSearch(){
  //try block to ensure code is dealt with correctly if it fails 
try {
  //updates word variable so it can be used by axios get on event click
  word = input.value
  //await get request for specidic word user searches
  const search = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  //gets the nested definition from api
  let wordMeaning = search.data[0].meanings
  console.log(search.data)
  //loops through the variety of options from api to display them all
  for (let i = 0; i < wordMeaning.length; i++) {
  //looping through and creating a list item for each of the definitions
    let dynamicList = defList.appendChild(document.createElement('li'))
    dynamicList.innerText = `${i + 1}. ${wordMeaning[i].definitions[0].definition}`
  } }
catch (err){
  console.log(err)
  failed.innerText = 'invalid word'
  setTimeout(() => failed.innerText = '', 3000)
  
}
  }
  // [0].meanings[0].definitions


