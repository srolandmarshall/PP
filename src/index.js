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

let today_site_html = [];

const getHTML = url => {
  axios
    .get("https://google.com")
    .then(response => {
      console.log(response.data);
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

const all_html = () => {
  getHTML();
};

$("#app").html(all_html());
