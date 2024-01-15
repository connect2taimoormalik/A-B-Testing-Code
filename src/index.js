import "./styles.css";
import $ from "jquery";
import { trackPageview, trackEvent } from "./analytics-api.js";

$(document).ready(function () {
  $("body").on("click", "#sign_up_button", function () {
    // alert("123");
    let apiKey = "7ca60b0b53921e23c7f09131d2695b52930d5aaf3560ada4bde8dba8";
    // fetch("https://www.cloudflare.com/cdn-cgi/trace")
    //   .then((res) => res.text())
    //   .then((data) => {
    //     let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
    //     let ip = data.match(ipRegex)[0];
    //     alert(ip);
    //   });
    fetch(`https://api.ipdata.co?api-key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        // alert(data.ip);
        // alert(data.city);
        // alert(data.country_code);
        alert(data.ip);
      });
  });

  function getIpOfUser() {
    const apiKey = "7ca60b0b53921e23c7f09131d2695b52930d5aaf3560ada4bde8dba8";
    let ip = "";

    $.ajax({
      type: "GET",
      async: false,
      url: `https://api.ipdata.co?api-key=${apiKey}`,
      dataType: "json",
      success: function (result) {
        ip = result.ip;
      },
    });
    return ip;
  }

  function trackUserOnPageLoad() {
    SetTheCookie("ip", getIpOfUser());
    // alert(document.cookie);
  }
  trackUserOnPageLoad();

  function SetTheCookie(key, value) {
    // Expire date for cookie
    var expires = new Date();
    // Set expire date for cookie
    expires.setTime(expires.getTime() + 1 * 24 * 60 * 60 * 1000);
    // Set cookie key and value which is passed in by parameters
    document.cookie = key + "=" + value + ";expires=" + expires.toUTCString();
  }

  function GetTheCookie(key) {
    // Check to see if there is a cookie matching the value passed in by parameter
    // var keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
    // return keyValue ? keyValue[2] : null;
    return document.cookie;
  }
  alert(document.cookie);
});
