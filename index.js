#!/usr/bin/env node
const SunCalc = require("suncalc");
const dayjs = require("dayjs");
const packageName = "0xpom";

if (["-h", "--help", "info"].some(e => process.argv.includes(e))) {
  console.log(`Usage: ${packageName} [date]`);
} else {
  if (process.argv[2] === undefined) {
    console.log(todaysValue().name);
  } else {
    if (
      ["-e", "--emoji"].some(e => process.argv[2] === e) &&
      process.argv[3] === undefined
    ) {
      console.log(todaysValue().emoji);
    } else {
      if (
        process.argv.slice(2, 4).some(e => /^\d{4}(-|\/)\d\d?\1\d\d?$/.test(e))
      ) {
        console.log(
          translate(
            getValue(
              dayjs(process.argv[process.argv[2] === "-e" ? 3 : 2]).toDate()
            )
          )[process.argv.indexOf("-e") > -1 ? "emoji" : "name"]
        );
      } else {
        console.log(
          "Wrong format (yyyy-mm-dd, yyyy/mm/dd, yyyy-m-d, yyyy/m/d)"
        );
      }
    }
  }
}

function todaysValue() {
  return translate(getValue(Date.now()));
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
