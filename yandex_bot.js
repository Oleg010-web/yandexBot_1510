// ==UserScript==
// @name         Bot for yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==


function getRandom(min,max){
  return Math.floor(Math.random()*(max-min)+min);
}
let yandexInput= document.getElementById("text");
let yandexButton = document.querySelector("button");
let yandexInputWords = ["Флейта", "Пианино", "Скрипка", "Гармонь","Гитара"];
let yandexInputWord = yandexInputWords[getRandom(0,yandexInputWords.length)];
if(yandexButton != undefined && yandexInput != undefined){
    let x = 0;
    let intervalId = setInterval(function(){
      yandexInput.value = yandexInput.value + yandexInputWord[x];
      x++;
        if(x == yandexInputWord.length){
           clearInterval(intervalId);
           yandexButton.click();
        }
    },500);
  // yandexInput.value = "Гитара";

}else{
 let aGroup = document.querySelector(".pager__items");
 let finalPage = aGroup.querySelector("span").innerText;
 let linkIsFound = false;
 let aLinks = document.links;
 for(let i = 0; i < aLinks.length; i++){
   if(aLinks[i].href.includes("www.wildberries.ru")){
       aLinks[i].removeAttribute("target");
       aLinks[i].click();
       linkIsFound = true;
       break;
   }
 }
   if(!linkIsFound && finalPage<5){
       setTimeout(()=>{aGroup.lastElementChild.click();},1500)
    }else if(!linkIsFound){
       location.href = "https://yandex.ru/";
    }
}
