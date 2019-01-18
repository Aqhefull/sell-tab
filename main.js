const tabs = Array.from(document.querySelectorAll('.tabs .tabs__item'));
const infoTitle = document.getElementById('infoTitle')
const infoDescr = document.getElementById('infoDescr')
const fetchAsync = async (api) => {
  let response = await fetch(api);
  let data = await response.json();
  return data;
}
tabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    const current = document.querySelector('.active');
    if (current) current.className = current.className.replace("active", "");
    if (e.target.dataset.id) {
      if (!e.target.classList.contains("active")) e.target.classList.add("active");
      const id = e.target.dataset.id
      fetchAsync(`https://raw.githubusercontent.com/sellbe/test-task/master/data/${id}.json`)
        .then(data => {
          const textArr = data.content.split(' ')
          let max = 0;
          let maxLetter = ''
          const numOfCopies = textArr.reduce((acc, el) => {
            acc[el] = (acc[el] || 0) + 1;
            if (max < acc[el]) {
              max = acc[el]
              maxLetter = el
            }
            return acc;
          }, {});
          const re = new RegExp(maxLetter, "g");
          const temp = data.content.replace(re, `<strong>${maxLetter}</strong>`)

          infoTitle.innerHTML = data.title;
          infoDescr.innerHTML = temp;
        })
        .catch(reason => console.log(reason.message))
    }
  })
});
