#!/usr/bin/env node
const SunCalc = require("suncalc");
const dayjs = require("dayjs");

if (process.argv[2] === undefined) {
  console.log(translate(getValue(Date.now())).name);
} else {
  if (process.argv[2] === "-e" && process.argv[3] === undefined) {
    console.log(translate(getValue(Date.now())).emoji);
  } else {
    if (process.argv.slice(2, 4).some(e => /\d{4}-\d{2}-\d{2}/.test(e))) {
      console.log(
        translate(
          getValue(
            dayjs(process.argv[process.argv[2] === "-e" ? 3 : 2]).toDate()
          )
        )[process.argv.indexOf("-e") > -1 ? "emoji" : "name"]
      );
    } else {
      console.log("Wrong format (yyyy-mm-dd)");
    }
  }
}

function getValue(date) {
  return parseFloat(SunCalc.getMoonIllumination(date).phase).toFixed(2);
}

function translate(num) {
  if (num < 0.12) {
    return {
      name: "New Moon",
      emoji: "🌑"
    };
  } else if (num < 0.25) {
    return {
      name: "Waxing Crescent",
      emoji: "🌒"
    };
  } else if (num < 0.37) {
    return {
      name: "First Quarter",
      emoji: "🌓"
    };
  } else if (num < 0.5) {
    return {
      name: "Waxing Gibbous",
      emoji: "🌔"
    };
  } else if (num < 0.62) {
    return {
      name: "Full Moon",
      emoji: "🌕"
    };
  } else if (num < 0.75) {
    return {
      name: "Waning Gibbous",
      emoji: "🌖"
    };
  } else if (num < 0.87) {
    return {
      name: "Last Quarter",
      emoji: "🌗"
    };
  } else {
    return {
      name: "Waning Crescent",
      emoji: "🌘"
    };
  }
}
