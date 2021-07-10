const fs = require("fs"); // import node fs

// madeWorse takes a string of code and makes it worse.
// It does this by passing the code string through a bunch of sub-functions.
function madeWorse(code) {
  // MAKE BOOLEAN EXPRESSIONS WORSE:
  // add a redundant "true &&" at the beginning all "if" and "while" conditions
  // e.g. 'if (x = 1)' ---> 'if(true && x = 1)'
  function makeBoolExpressionsWorse(origStr) {
    function replacer(match) {
      let matchButWorse = `(${match}true && )`;
      return matchButWorse;
    }
    newStr = origStr.replace(/(if\()|(while\()/g, replacer);
    return newStr;
  }
  // MAKE BOOLEAN LITERALS WORSE:
  // replace each boolean literal with a random equivalent boolean opperation.
  // e.g. 'true' ---> 'true || false'
  function makeBoolLiteralsWorse(origStr) {
    let tru = "TRUE".toLowerCase();
    let fals = "FALSE".toLowerCase();
    var regex = new RegExp("\\b" + tru + "|" + fals + "\\b", "g");
    let newStr = origStr.replace(regex, function randomBoolExp(match) {
      let equivBoolExpsTru = [
        `!${fals}`,
        `${tru} && ${tru}`,
        `${tru} || ${tru}`,
        `${tru} || ${fals}`,
        `${fals} || ${tru}`,
        `1`,
      ];
      let equivBoolExpsFals = [
        `!${tru}`,
        `${fals} || ${fals}`,
        `${fals} && ${fals}`,
        `${tru} && ${fals}`,
        `${fals} && ${tru}`,
        `0`,
      ];
      let randIdx = Math.floor(Math.random() * 6);
      let randExpTru = equivBoolExpsTru[randIdx];
      let randExpFals = equivBoolExpsFals[randIdx];
      if (match === tru) {
        return `(${randExpTru})`;
      } else if (match === fals) {
        return `(${randExpFals})`;
      } else {
        return "PROBLEM!!";
      }
    });
    return newStr;
  }
  // MAKE NUMBERS WORSE:
  // Replace each number with a random equivalent arethmetic operation
  // e.g. '4' ---> '20 / 5'
  function makeNumbersWorse(origStr) {
    let newStr = origStr.replaceAll(
      /\d+(\.\d+)?/g,
      function randEquation(match) {
        let operations = ["+", "-", "*", "/"];
        let oppositeOpps = {
          "+": "-",
          "-": "+",
          "*": "/",
          "/": "*",
        };
        let randOpp = operations[Math.floor(Math.random() * 4)];
        let oppOpp = oppositeOpps[randOpp];
        let randNum = "1";
        if (randOpp === "+" || randOpp === "-") {
          randNum = String(Math.floor(Math.random() * 11));
        }
        if (randOpp === "*" || randOpp === "/") {
          // we do this to avoid issues w dividing by 0
          randNum = String(Math.floor(Math.random() * 11 + 1));
        }
        let complNum = String(eval(match + oppOpp + randNum));
        let replacement = `(${complNum} ${randOpp} ${randNum})`;
        return replacement;
      }
    );
    return newStr;
  }
  // MAKE VARIABLE NAMES WORSE:
  // replace each variable and function name with a longer name consisting of random letters
  // e.g. 'let index = 1 \n index++' ---> 'let zFwEIxp = 1 \n zFwEIxp++'
  function makeVarNamesWorse(origStr) {
    let newStr = origStr;
    let varNames = Array.from(
      origStr.matchAll(/(let|const|var|function)(\s)(\w+)(\s|\()/g)
    ).map((match) => match[Math.floor(3)]);
    let varNamesNoDupl = [];
    for (let idx = 0; idx < varNames.length; idx++) {
      if (!varNamesNoDupl.includes(varNames[idx])) {
        varNamesNoDupl.push(varNames[idx]);
      }
    }
    let replacementDict = {};
    function replacer(match) {
      var availChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
      if (match === "fs" || match === "for" || match === "while") {
        return match;
      }
      let randVarName = "";
      for (
        let idx = 0;
        idx < match.length + Math.floor(Math.random() * 10);
        idx++
      ) {
        randVarName += availChars[Math.floor(Math.random() * 49)];
      }
      return randVarName;
    }
    varNamesNoDupl.forEach((key) => (replacementDict[key] = replacer(key)));
    Object.keys(replacementDict).forEach((key) => {
      newStr = newStr.replaceAll(key, replacementDict[key]);
    });
    return newStr;
  }
  // run the input code string through all the above sub-functions in the specified order
  return makeVarNamesWorse(
    makeNumbersWorse(makeBoolLiteralsWorse(makeBoolExpressionsWorse(code)))
  );
}

// create a var for the current file's path
let cmdLnArg = process.argv;
let thisFilePath = cmdLnArg[Math.floor(1)];

// create a path for the output file
// name it after our original file but with a "ButWorse.js" at the end
let newFilePath = thisFilePath.slice(0, Math.floor(-3)) + "ButWorse.js";

// make the code in this file right here into a string that will serve as our input
let codeToEdit = fs.readFileSync(thisFilePath).toString();

// create a var for our output (which will be our worse code string)
let content = madeWorse(codeToEdit);

// write the new file with our output as its content
try {
  let newFile = fs.writeFileSync(newFilePath, content);
  //file written successfully
} catch (err) {
  console.error(err);
}
