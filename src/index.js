import * as Rx from 'rxjs'
import {
  map,
  debounceTime,
  flatMap
} from 'rxjs/operators'


// --- Functional Programming ---
// -----------------------------------------------------------------------

// const source = [1, 2, 3, 4];
// const calc = function (item) {
//   return item * 1000
// }
// const newSource = source.map(calc)
// console.log(newSource)

//const newSource = source.map(item => item * 1000)

// -----------------------------------------------------------------------





//  ---  Iterator pattern --- 
// -----------------------------------------------------------------------

// source.forEach(element => {
//   console.log(`項目: ${element}`)
// });

// -----------------------------------------------------------------------





// --- Reactive Programming && Observer pattern ---
// -----------------------------------------------------------------------

// const inputElelemt = document.getElementById('inputElelemt')
// inputElelemt.addEventListener('keyup', function () {
//   alert('keyup!')
// })

// -----------------------------------------------------------------------





// --- Observer pattern ---
// -----------------------------------------------------------------------

// const inputElelemt = document.getElementById('inputElelemt')
// Rx.fromEvent(inputElelemt, 'keyup')
//   .subscribe(e => alert(e.target.value))

// 可以看出Observable與Subscriber 

// const inputElelemt = document.getElementById('inputElelemt')
// const keyupObservable = Rx.fromEvent(inputElelemt, 'keyup')
// console.log(keyupObservable)
// const keyupSubscriber = Rx.fromEvent(inputElelemt, 'keyup').subscribe(e => alert(e.target.value))
// console.log(keyupSubscriber)

// -----------------------------------------------------------------------




// --- 套用map到Observable  ---
// -----------------------------------------------------------------------

// const inputElelemt = document.getElementById('inputElelemt')
// Rx.fromEvent(inputElelemt, 'keyup')
//   .pipe(
//     map(e => parseInt(e.target.value) * 1000)
//   )
//   .subscribe(value => console.log(value))


// -----------------------------------------------------------------------



// --- 非同步搜尋實例 (一般)---
// -----------------------------------------------------------------------

const fetchWiki = (keyword) => {
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


const render = (val) => {
  let el = document.createElement('p')
  el.innerHTML = val
  document.body.appendChild(el)
}

// const inputElelemt = document.getElementById('inputElelemt')
// inputElelemt.addEventListener('input', (e) => {
//   fetchWiki(e.target.value).then((data) => {
//     console.log(data)
//     render(data[1])
//   })
// })



//優化  去抖動

// var timer = null;
// const inputElelemt = document.getElementById('inputElelemt')
// inputElelemt.addEventListener('input', (e) => {
//   if (timer) {
//     clearTimeout(timer);
//   }
//   timer = setTimeout(() => {
//     fetchWiki(e.target.value).then((data) => {
//       render(data[1])
//     })
//   }, 400)
// })

// -----------------------------------------------------------------------





// --- 非同步搜尋實例 (使用RxJS) --- 
// -----------------------------------------------------------------------

Rx.fromEvent(inputElelemt, 'keyup')
  .pipe(
    debounceTime(400),
    map(event => event.target.value),
    flatMap(value => {
      return Rx.from(fetchWiki(value))
        .pipe(
          map(response => response[1])
        )
    })
  )
  .subscribe(value =>
    render(value)
  )

// -----------------------------------------------------------------------