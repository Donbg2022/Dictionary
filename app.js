//create DOM variables
const input = document.querySelector('#input');
const search = document.querySelector('#search')
const defList = document.querySelector('#list')
const failed = document.querySelector('#fail')
const searchedWord = document.querySelector('#searched-word')
const phonetic = document.querySelector('#phonetic')
let word = ''
let wordUrl = ``



search.addEventListener('click', wordSearch)

// async function used in a click event listener do add definitions to page
async function wordSearch(){
  //try block to ensure code is dealt with correctly if it fails 
try {

  //reinitiates the ul to an empty list to avoid list items piling up upon new searches
  defList.innerHTML = '<li></li>'

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
  
  //add a word Header with user input   
  //use api obj word insted of input.value to ensure word is valid before updating header
  let userWord = search.data[0].word
  let dynamicWord = searchedWord.innerText = userWord


  //phonetics
  let pronounce = search.data[0].phonetic
  let dynamicPronounce = phonetic.innerText = pronounce
  
} }

catch (err){
  console.log(err)
  failed.innerText = 'invalid word'
  setTimeout(() => failed.innerText = '', 3000)
  
}
  }


  function newLi(){
    defList.innerHTML = '<li></li>'
  }