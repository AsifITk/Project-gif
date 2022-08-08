let search = document.querySelector(".search");
let translate = document.querySelector(".translate");
let input = document.querySelector(".input");
let gif = document.querySelector(".gif");
let sticker = document.querySelector(".sticker");
let itemContainer = document.querySelector(".items-container");
let scrollTo = document.querySelector("#one");

let move = document.querySelector(".move");
let move1 = document.querySelector(".move1");

let searchBar = document.querySelector(".myInput");

let grid = document.querySelector(".grid");

let searching = true;
let translateSearch = false;
let gifsearch = true;
let stickersearch = false;

// !get the trending gifs
async function onLoad() {
  let response = await fetch(
    "https://api.giphy.com/v1/gifs/trending?api_key=1qWbfPe4JLsnDqndv2oAcr2t6UcbRQZO&limit=30&rating=g"
  );
  let data = await response.json();
  createUi(data);
  grid.classList.add("hide");

  // console.log(data.data[0].images.fixed_height.url);
}
// !!create the ui

function createUi(data) {
  // console.log(data.data);
  for (let i = 0; i < data.data.length; i++) {
    let url = data.data[i].images.fixed_height.url;
    createCard(url);
    // console.log(data.data[i].images.downsized_small.mp4);
  }
  // window.scroll(0, 1000);
  // scrollTo.scrollIntoView();
}

// !create card with url gif
function createCard(url) {
  let gif1 = document.createElement("div");
  gif1.classList.add("gif-img");
  gif1.innerHTML = `<img src="${url}" alt="">`;
  itemContainer.appendChild(gif1);
}

// !added click listener to  buttons
search.addEventListener("click", () => {
  searching = true;
  translateSearch = false;
  move.classList.remove("push");

  console.log(searching, translateSearch, gifsearch, stickersearch);
});
translate.addEventListener("click", async () => {
  search = false;
  translateSearch = true;
  move.classList.add("push");
  if (gifsearch) {
    itemContainer.replaceChildren();
    let response = await fetch(
      "https://api.giphy.com/v1/gifs/trending?api_key=1qWbfPe4JLsnDqndv2oAcr2t6UcbRQZO&limit=30&rating=g"
    );
    let data = await response.json();
    createUi(data);
  } else {
    itemContainer.replaceChildren();
    let response = await fetch(
      "https://api.giphy.com/v1/stickers/trending?api_key=1qWbfPe4JLsnDqndv2oAcr2t6UcbRQZO&limit=30&rating=g"
    );
    let data = await response.json();
    createUi(data);
  }

  console.log(searching, translateSearch, gifsearch, stickersearch);
});
gif.addEventListener("click", async () => {
  move1.classList.remove("push2");
  gifsearch = true;
  stickersearch = false;
  console.log(searching, translateSearch, gifsearch, stickersearch);
});

sticker.addEventListener("click", async () => {
  itemContainer.replaceChildren();

  move1.classList.add("push2");
  gifsearch = false;
  stickersearch = true;
  console.log(searching, translateSearch, gifsearch, stickersearch);
  let response = await fetch(
    "https://api.giphy.com/v1/stickers/trending?api_key=1qWbfPe4JLsnDqndv2oAcr2t6UcbRQZO&limit=30&rating=g"
  );
  let data = await response.json();
  createUi(data);
});

async function changeUi(word) {
  let data = "";
  //clean the items
  //check gif selected or stickers selected
  if (gifsearch && searching) {
    //fetch and render
    let response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=1qWbfPe4JLsnDqndv2oAcr2t6UcbRQZO&q=${word}&limit=25&offset=0&rating=g&lang=en`
    );
    data = await response.json();
    console.log("running1");
  }
  if (stickersearch && searching) {
    let response = await fetch(
      `https://api.giphy.com/v1/stickers/search?api_key=1qWbfPe4JLsnDqndv2oAcr2t6UcbRQZO&q=${word}&limit=25&offset=0&rating=g&lang=en`
    );
    data = await response.json();

    console.log("running2");
  }

  if (translateSearch && gifsearch) {
    let response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=1qWbfPe4JLsnDqndv2oAcr2t6UcbRQZO&q=quick&limit=25&offset=0&rating=g&lang=en`
    );
    data = await response.json();
    console.log("running3");
    //fetch
  }
  if (translateSearch && stickersearch) {
    itemContainer.replaceChildren();

    let response = await fetch(
      `https://api.giphy.com/v1/stickers/search?api_key=1qWbfPe4JLsnDqndv2oAcr2t6UcbRQZO&q=quick&limit=25&offset=0&rating=g&lang=en`
    );
    data = await response.json();
    console.log("running4");
    //fetch
  }
  //check translate search or normal search
  //update the list
  //move view port to items
  return data;
}

onLoad();
function sleep(num) {
  // let now = new Date();
  // const stop = now.getTime() + num;
  // while (true) {
  //   now = new Date();
  //   if (now.getTime() > stop) return;
  // }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, num);
  });
}

searchBar.addEventListener("keypress", async function (event) {
  itemContainer.replaceChildren();
  if (event.key === "Enter") {
    grid.classList.add("show");
    grid.classList.remove("hide");
    //!show loading

    scrollTo.scrollIntoView();
    await new Promise((r) => setTimeout(r, 1000));
    let word = event.target.value;
    console.log(word);
    let data = await changeUi(word);
    grid.classList.remove("show");
    grid.classList.add("hide");

    createUi(data);
    await new Promise((r) => setTimeout(r, 2000));

    scrollTo.scrollIntoView();
  }
});

// input.addEventListener("onKeydown", changeUi);
// const textbox = document.getElementById("txtSearch");
// textbox.addEventListener("keypress", function onEvent(event) {
//     if (event.key === "Enter") {
//         document.getElementById("btnSearch").click();
//     }
// });
