import "./styles.css";
import jQuery from "jquery";
const axios = require("axios");
const cheerio = require("cheerio");

let $ = jQuery.noConflict();
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

let today_str = formatDate(today);
let tomorrow_str = formatDate(tomorrow);

let today_url = getMLBUrl(today_str);
let tomorrow_url = getMLBUrl(tomorrow_str);

const getHTML = url => {
  axios
    .get("https://cors.io/?"+url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      let pitchers = [];
      $(".probable-pitchers__pitcher-name-link").each(function(i,l){
        let pitcher = $(this.children[i].data)
        console.log(pitcher)
        pitchers.push(pitcher)
      })
      console.log(pitchers)
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

let today_site_html = getHTML(today_url);
let tomorrow_site_html = getHTML(tomorrow_url);


const all_html = () => {
  console.log("tall_html")
};

$("#app").html(all_html());
