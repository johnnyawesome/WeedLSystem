/// <reference path="../TSDef/p5.global-mode.d.ts" />

"use strict";

function setup() {
  createCanvas(650, 650, P2D);
  background(0);
  stroke(0, 255, 0);
  strokeWeight(2);
  angleMode(DEGREES);
  printInfo();
}

let lSystem = {

  //The Axion
  axiom: "X",
  //Character1 to match
  match1: "F",
  //Rule to apply if Character1 matches
  rule1: "FF",
  //Character2 to match
  match2: "X",
  //Rule to apply if Character2 matches
  rule2: "F[+X]F[-X]+X",
  //The characters that should cause a line to be drawn
  drawChar1: "F",
  drawChar2: "",
  //Angle
  theta: 20
};

//Segment Parameters
let segment = {
  initLength: 140,
  minLength: 2,
  lengthMod: 0.5,
  length: this.initLength
};

//Scaling Parameters
let scaling = {
  init: 1,
  factor: 1,
  actual: this.init
};

//L-System Array
let lindenSysArr = lSystem.axiom.split("");

//Constants
const constants = ["+", "-", "[", "]"];

//Calculates and draws one iteration of the L-System every interval
let createLSystem = setInterval(() => {
  if (segment.length > segment.minLength) {
    background(0);
    calculateLindenSysArr();
    drawLindenSysArr(segment.length);
  }
  else {
    resetAnimation();
  }
}, 2000);

//Calculates the iterations and puts the result in an array
function calculateLindenSysArr() {

  //Temporary array to do all calculations
  let lindenSysArrTemp = [];

  //Applies L-System rule-set
  lindenSysArr.forEach((element) => {

    //If it matches lSystem.match1....
    if (element === lSystem.match1) {
      //...create a temporary array, filled with the elements
      //returned by the string.split method
      let tempRuleArray = lSystem.rule1.split("");
      tempRuleArray.forEach((element1) => {
        //Append the contents of tempRuleArray to lindenSysArrTemp
        lindenSysArrTemp.push(element1);
      });
    }
    //If it matches lSystem.match2....
    if (element === lSystem.match2) {
      //...create a temporary array, filled with the elements
      //returned by the string.split method
      let tempRuleArray = lSystem.rule2.split("");
      tempRuleArray.forEach((element1) => {
        //Append the contents of tempRuleArray to lindenSysArrTemp
        lindenSysArrTemp.push(element1);
      });
    }
    //If element is a constant, push it
    else if (constants.indexOf(element) !== -1) lindenSysArrTemp.push(element);

    //Replace lindenSysArr with lindenSysArrTemp
    lindenSysArr = lindenSysArrTemp.slice(0);

  });
  console.log("Current lindenSysArr:", lindenSysArr);
}

//Displays the L-System Array "lindenSysArr"
function drawLindenSysArr(length) {

  if (length > segment.minLength) {

    push();

    //Transformations to center the L-System
    translate(width / 2, height - 50);
    rotate(-90);

    //Scales the L-System
    scale(scaling.actual);
    scaling.actual *= scaling.factor;

    //Draws the actual shape
    for (let i = 0; i < lindenSysArr.length; i++) {
      const element = lindenSysArr[i];

      //Draw a line
      if (element === lSystem.drawChar1 || element === lSystem.drawChar2) {
        line(0, 0, length, 0);
        translate(length, 0);
      }
      //"+" turn positive lSystem.theta, "-" turn negative lSystem.theta
      else if (element === "+") rotate(lSystem.theta);
      else if (element === "-") rotate(-lSystem.theta);
      //"[" push() to the Matrix, "]" pop() the Matrix
      else if (element === "[") push();
      else if (element === "]") pop();
    }
    pop();
  }
  //Adjust segment length
  segment.length *= segment.lengthMod;
}

//Resets Animation
function resetAnimation() {
  segment.length = segment.initLength;
  scaling.actual = scaling.init;
  lindenSysArr = lSystem.axiom.split("");
}

//Informational Output
function printInfo() {
  console.log("################################");
  console.log("L-System by JohnnyAwesome");
  console.log("################################");
  console.log("L-System Algorithm:");
  console.log("Axiom:", lSystem.axiom);
  console.log("Rule 1:", lSystem.rule1);
  console.log("Rule 2:", lSystem.rule2);
  console.log("Angle:", lSystem.theta);
}

function draw() {
}