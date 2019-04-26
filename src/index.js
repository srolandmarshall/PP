import "./styles.css";
import jQuery from "jquery";
const axios = require("axios");
const cheerio = require("cheerio");

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

let today_str = formatDate(today);
let tomorrow_str = formatDate(tomorrow);

let today_url = getMLBUrl(today_str);
let tomorrow_url = getMLBUrl(tomorrow_str);

const getPitchers = url => {
  axios
    .get("https://cors.io/?"+url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      let pitchers = [];
      $(".probable-pitchers__pitcher-name-link").each(function(i,l){
        let pitcher = $(this).text()
        pitchers.push(pitcher)
      })
      console.log(pitchers)
      return pitchers
    })
    .catch(error => {
      console.log(error.response);
    });
};

function getMLBUrl(date_str) {
  return "https://www.mlb.com/probable-pitchers/" + date_str;
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

let todays_pitchers = getPitchers(today_url);
let tomorrows_pitchers = getPitchers(tomorrow_url);

function updatePitchers(todays_pitchers,tomorrows_pitchers){
  todays_pitchers.each(function(i,l){
    console.log(l)
    $("#todays_pitchers").append(l)
  })
}

updatePitchers(todays_pitchers,tomorrows_pitchers)
