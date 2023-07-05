// ==UserScript==
// @name         gitlab-docs dark
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make gitlab-docs dark
// @author       You
// @match        https://docs.gitlab.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gitlab.com
// @grant        none
// ==/UserScript==

// There's probably several ways to re-write the CSS, but we take the palette from
//  https://gitlab.com/gitlab-org/gitlab-docs/-/blob/main/content/assets/stylesheets/_variables.scss
//  and change the values with a map lookup
//  ### Palette
//   #fff    = rgb(255, 255, 255)
//   #fafafa = rgb(250, 250, 250)
//   #f0f0f0 = rgb(240, 240, 240)
//   #dbdbdb = rgb(219, 219, 219)
//   #bfbfbf = rgb(191, 191, 191)
//   #999    = rgb(153, 153, 153)
//   #868686 = rgb(134, 134, 134)
//   #666    = rgb(102, 102, 102)
//   #5e5e5e = rgb(94, 94, 94)
//   #525252 = rgb(82, 82, 82)
//   #404040 = rgb(64, 64, 64)
//   #303030 = rgb(48, 48, 48)
//   #1f1f1f = rgb(31, 31, 31)

//  #f2f2f2 = rgb(242, 242, 242)
//  #4f4f4f = rgb(79, 79, 79)
//  #222261 = rgb(34, 34, 97)
// #2F2A6B = rgb(47, 42, 107)

// Use a background Map that will be our conditional first lookup
const bgmap = new Map([
    ["rgb(255, 255, 255)", "#222"],
    //["rgb(250, 250, 250)", ""],
    //["rgb(240, 240, 240)", ""],
    //["rgb(219, 219, 219)", ""],
    //["rgb(191, 191, 191)", ""],
]);

const fgmap = new Map([
    //["rgb(153, 153, 153)", ""],
    //["rgb(134, 134, 134)", ""],
    //["rgb(102, 102, 102)", ""],
    //["rgb(94, 94, 94)", ""],
    ["rgb(82, 82, 82)", "#dfdfdf"],
    ["rgb(79, 79, 79)", "#dfdfdf"], //
    ["rgb(64, 64, 64)", "#f2f2f2"],
    ["rgb(48, 48, 48)", "#fafafa"],
    ["rgb(31, 31, 31)", "#fff"],
]);

let mergedmap = new Map([...bgmap, ...fgmap]);

const allElements = document.querySelectorAll('*');

allElements.forEach(element => {
  var backgroundColorLookup = getComputedStyle(element).backgroundColor;
  //if (bgmap.has(backgroundColorLookup)) {console.log("Has element backgroundColorLookup")};
  //if (bgmap.has(backgroundColorLookup)) {console.log(bgmap.get(backgroundColorLookup))};
  if (bgmap.has(backgroundColorLookup)) {
    var foregroundColorLookup = getComputedStyle(element).color
    // Change the Background Color to the mapped value
    element.style.backgroundColor = bgmap.get(backgroundColorLookup)
    // Check if the .color is in bgmap values and replace with the key
    //console.log(foregroundColorLookup)
    if (fgmap.has(foregroundColorLookup)) {
        //console.log("We should be trying to set this")
        //console.log(fgmap.get(foregroundColorLookup))
        element.style.color = fgmap.get(foregroundColorLookup)
    };
  };
});

// Some elements don't seem to getting set (probably backgroundColor wasn't changing)
allElements.forEach(element => {
  if (getComputedStyle(element).color === 'rgb(79, 79, 79)') {
    //console.log("got missing match");
    element.style.color = '#fafafa'
  };  
});

// Fix for hard to see element on dark background
allElements.forEach(element => {
  if (getComputedStyle(element).color === 'rgb(34, 34, 97)') {
    //console.log("got dark match");
    element.style.color = '#2F2A6B'
  };  
});
