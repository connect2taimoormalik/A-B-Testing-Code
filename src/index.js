import "./styles.css";
import $ from "jquery";
import { trackPageview, trackEvent } from "./analytics-api.js";

const apiKeyToTrack =
  "7ca60b0b53921e23c7f09131d2695b52930d5aaf3560ada4bde8dba8";
const variationTypes = ["image", "video", "quote", "book_list"];

$(document).ready(function () {
  function getInformationOfCurrentUser() {
    let result = {};

    $.ajax({
      type: "GET",
      async: false,
      url: `https://api.ipdata.co?api-key=${apiKeyToTrack}`,
      dataType: "json",
      success: function (response) {
        result = {
          ip: response.ip,
          city: response.city,
          country_code: response.country_code,
        };
      },
    });
    return result;
  }

  function prepareParamsAndTrackPageView() {
    const userInformation = getInformationOfCurrentUser();
    const params = {
      variation_type: localStorage.getItem("variation_type"),
      ...userInformation,
    };
    trackPageview(params);
    setItemInLocalStorage("current_ip", userInformation.ip);
    setItemInLocalStorage("current_city", userInformation.city);
    setItemInLocalStorage("current_country_code", userInformation.country_code);
  }

  function prepareParamsAndTrackSignUpEvent() {
    const params = {
      variation_type: localStorage.getItem("variation_type"),
      ip: localStorage.getItem("current_ip"),
      city: localStorage.getItem("current_city"),
      country_code: localStorage.getItem("current_country_code"),
    };
    trackEvent(params);
  }

  function setItemInLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  $("body").on("click", "#sign_up_button", function () {
    alert(localStorage.getItem("user_tracked_on_sign_up"));
    if (localStorage.getItem("user_tracked_on_sign_up") !== "true") {
      setItemInLocalStorage("user_tracked_on_sign_up", "true");
      prepareParamsAndTrackSignUpEvent();
    }
  });

  function trackUserOnPageLoad() {
    if (localStorage.getItem("user_tracked_on_page_view") === "true") {
      const selectedVariation = localStorage.getItem("variation_type");
      $("#" + selectedVariation + "_variation").removeAttr("hidden");
    } else {
      const selectedVariation =
        variationTypes[Math.floor(Math.random() * variationTypes.length)];
      $("#" + selectedVariation + "_variation").removeAttr("hidden");
      setItemInLocalStorage("variation_type", selectedVariation);
      setItemInLocalStorage("user_tracked_on_page_view", "true");
      prepareParamsAndTrackPageView();
    }
  }
  trackUserOnPageLoad();
});
