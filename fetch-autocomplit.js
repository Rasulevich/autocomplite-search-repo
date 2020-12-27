
const result = document.querySelector('.posts');
const choisenPost = document.querySelector('.choisenPost')

let debounce = (fn,ms) => {
    let clearTime;
    return function () {      
        const call = () => {fn.apply(this,arguments)}
        clearTimeout(clearTime)     
        clearTime = setTimeout(call,ms)
    }
}

function search () {
    let index = this.value.trim();
    result.innerHTML = '';
    if(index) {
        fetch(`https://api.github.com/search/repositories?&page=1&per_page=5&q=${index}`)
        .then(response => response.json())
        .then(res => {
            let elements = res.items;
            const fragment = document.createDocumentFragment();
            if (elements.length > 0) {
                elements.forEach(el => {
                    const card = document.createElement('div');
                    card.style = 'border:solid 1px; padding-left:16px;height:20px';
                    const title = document.createElement('h4');
                    card.onclick = function () {
                        const item = document.createElement('div');
                        item.style = 'border:solid 1px; padding-left:16px;height:90px;line-height:10%'
                        const itemName = document.createElement('h4');
                        const itemOwner = document.createElement('h4');
                        const itemStars = document.createElement('h4');
                        itemName.textContent = `Name: ${el.name}`;
                        itemOwner.textContent = `Owner: ${el.owner.login}`;
                        itemStars.textContent = `Stars: ${el.stargazers_count}`;
                        const close = document.createElement('button')
                        close.style = 'position: relative; left:500px; bottom:60px';
                        close.onclick = function (){
                            item.style = 'display:none'
                        }
                        close.textContent = 'close';
                        item.appendChild(itemName);
                        item.appendChild(itemOwner);
                        item.appendChild(itemStars);
                        item.appendChild(close);
                        choisenPost.appendChild(item);
                        document.querySelector('.repoSearch').value = "";  
                        result.innerHTML = '';
                    }
                    title.textContent = el.name;
                    card.appendChild(title);
                    fragment.appendChild(card);
                });
                result.appendChild(fragment);
            }
        })
        .then(err => console.log(err))
    }
    if(!index){
        result.innerHTML = '';
    }
}

search = debounce(search, 500);

document.querySelector('.repoSearch').oninput = search;


