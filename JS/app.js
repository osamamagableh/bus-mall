'use strict';
let leftIndex;
let midIndex;
let rightIndex;
let maxAttempts = 25;
let attempt = 1;
let votes = [];
let views = [];
const names = ['bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg',
];

const leftImage = document.getElementById('left-image');
const midImage = document.getElementById('mid-image');
const rightImage = document.getElementById('right-image');
const imagesSection = document.getElementById('images-section');

function Mall(name) {
  this.name = name;
  this.path = `./images/${name}`;
  this.votes = 0;
  this.views = 0;
  Mall.all.push(this);
}
Mall.all = [];

for(let i =0;i<names.length;i++){
  new Mall(names[i]);
}

function render(){
  leftIndex = randomNumber(0,Mall.all.length-1);
  leftImage.src = Mall.all[leftIndex].path;
  leftImage.alt = Mall.all[leftIndex].name;
  leftImage.title = Mall.all[leftIndex].name;
  Mall.all[leftIndex].views++;
 

  rightIndex = randomNumber(0,Mall.all.length-1);
  rightImage.src = Mall.all[rightIndex].path;
  rightImage.alt = Mall.all[rightIndex].name;
  rightImage.title = Mall.all[rightIndex].name;
  Mall.all[rightIndex].views++;
  
  midIndex = randomNumber(0,Mall.all.length-1);
  midImage.src = Mall.all[midIndex].path;
  midImage.alt = Mall.all[midIndex].name;
  midImage.title = Mall.all[midIndex].name;
  Mall.all[midIndex].views++;

}

imagesSection.addEventListener('click',handelClick);

function handelClick(event){

  if (event.target.id !== 'images-section') {
    if (attempt < maxAttempts) {
      attempt++;
      if (event.target.id === rightImage.id) {
        Mall.all[rightIndex].votes++;
      }
      else if(event.target.id === leftImage.id) {
        Mall.all[leftIndex].votes++;
      }
      else{
        Mall.all[midIndex].votes++;
      }
      render();
    }
    else {
      if (event.target.id === rightImage.id) {
        Mall.all[rightIndex].votes++;
      }
      else if(event.target.id === leftImage.id) {
        Mall.all[leftIndex].votes++;
      }
      else{
        Mall.all[midIndex].votes++;
      }
      let ulEl = document.getElementById('listResult');
      let liEl;
      for (let i = 0; i < Mall.all.length; i++) {
        votes.push(Mall.all[i].votes);
        views.push(Mall.all[i].views);

        liEl = document.createElement('li');
        liEl.textContent = `${Mall.all[i].name} has ${Mall.all[i].views} views and has ${Mall.all[i].votes} votes.`;
        ulEl.appendChild(liEl);
      }
      imagesSection.removeEventListener('click', handelClick);
      console.log('votes ', votes);
      console.log('views ', views);

      chartRender();
    }
   
  }
}
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

render();

function chartRender() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    
    type:'bar' ,

    
    data: {
      labels: names,
      datasets: [{
        label: 'pic votes',
        backgroundColor: 'red',
        borderColor: 'rgb(255, 99, 132)',
        data: votes
      },
      {
        label: 'pic views',
        backgroundColor: 'green',
        borderColor: 'rgb(255, 99, 132)',
        data: views
      }]
    },

    
    options: {}
  });
}


