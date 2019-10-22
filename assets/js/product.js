const shell = require('electron').shell;


$(document).ready(function() {
    var itemNum = sessionStorage.getItem("itemNum");
    console.log(itemNum)
    getItemByItemNum(itemNum)
    const links = document.querySelectorAll('a[href]');
    console.log(links);

    Array.prototype.forEach.call(links, function (link) {
        const url = link.getAttribute('href')
        if (url.indexOf('http') === 0) {
          link.addEventListener('click', function (e) {
            e.preventDefault()
          })
        }
    })
});



