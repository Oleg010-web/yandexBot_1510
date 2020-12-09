// ==UserScript==
// @name         Bot for yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://www.kinopoisk.ru/*
// @match        https://kosmolenta.com/*
// @match        https://www.wildberries.ru/*
// @grant        none
// ==/UserScript==

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getRandom(min,max){
  return Math.floor(Math.random()*(max-min)+min);
}

let sitesGroup = {
  "wildberries.ru": ["Флейта", "Пианино", "Скрипка", "Гармонь","Гитара"],
  "kinopoisk.ru": ["Побег из Шоушенка", "Шестое чувство", "Звездные войны", "Кристиан Бейл"],
  "kosmolenta.com": ["SpaceX", "Лунная гонка", "Программа Наса", "Марс"]
 };
let sites = Object.keys(sitesGroup)[getRandom(0,Object.keys(sitesGroup).length)];

let yandexInput= document.getElementById("text");
let yandexButton = document.querySelector("button");
let yandexInputWords = sitesGroup[sites];
let yandexInputWord = yandexInputWords[getRandom(0,yandexInputWords.length)];
if(yandexButton != undefined && yandexInput != undefined){
    let x = 0;
    document.cookie = "sites="+sites;
    let intervalId = setInterval(function(){
      yandexInput.value = yandexInput.value + yandexInputWord[x];
      x++;
        if(x == yandexInputWord.length){
           clearInterval(intervalId);
           yandexButton.click();
        }
    },500);
  // yandexInput.value = "Гитара";

}else if(location.hostname == "yandex.ru"){
 sites = getCookie("sites");
 let aGroup = document.querySelector(".pager__items");
 let finalPage;
 let linkIsFound = false;
 let aLinks = document.links;
 for(let i = 0; i < aLinks.length; i++){
   if(aLinks[i].href.includes(sites)){
       aLinks[i].removeAttribute("target");
       aLinks[i].click();
       linkIsFound = true;
       break;
   }
 }
    setTimeout(()=>{
      finalPage = aGroup.querySelector("span").innerText;
      if(!linkIsFound && finalPage<5){
       setTimeout(()=>{aGroup.lastElementChild.click();},1500)
    }else if(!linkIsFound){
       location.href = "https://yandex.ru/";
    }
    }, 1000)
}else{
  if(getRandom(0,10) > 7) { setTimeout(()=>{location.href = "https://yandex.ru/";},1500)};
  let aLinks = document.links;
  setInterval(()=>{
   let index = getRandom(0,aLinks.length);
   let link = aLinks[index];
   if(link.href.includes(location.hostname)){
     setTimeout(()=>{link.click();},2000);
   }
 },4000)
}

