import "./styles.css";

const axios = require("axios");
const cheerio = require("cheerio");
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

let today_str = formatDate(today);
let tomorrow_str = formatDate(tomorrow);

let today_url = getMLBUrl(today_str);
let tomorrow_url = getMLBUrl(tomorrow_str);

let today_site_html = "";

const getHTML = url => {
  axios
    .get(url)
    .then(function(response) {
      // handle success
      return response;
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .then(function() {
      // always executed
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
  return getHTML(today_url);
};

$("#app").html(all_html());
