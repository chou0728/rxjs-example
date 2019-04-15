// helper to print values
const printOut = (val) => {
  let el = document.createElement('p')
  el.innerHTML = val
  document.body.appendChild(el)

}
const searchWikipedia = (keyword) => {
  return $.ajax({
    url: 'http://en.wikipedia.org/w/api.php',
    dataType: 'jsonp',
    data: {
      action: 'opensearch',
      format: 'json',
      search: keyword
    }
  }).promise()
}

export {
  printOut,
  searchWikipedia
}