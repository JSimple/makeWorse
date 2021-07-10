const fs = require('fs'); // import node fs

function madeWorse(code){
  // MAKE BOOLEAN EXPRESSIONS WORSE
  function makeBoolExpressionsWorse(origStr){ 
    function replacer(match){
        let matchButWorse = `(${match}true && )`;
        return matchButWorse;
    }
    newStr = origStr.replace(/(if\()|(while\()/g, replacer);
    return newStr;
  }
  // MAKE BOOLEAN LITERALS WORSE
  function makeBoolLiteralsWorse(origStr){
    let tru = 'TRUE'.toLowerCase();
    let fals = 'FALSE'.toLowerCase();
    var regex = new RegExp("\\b"+ tru +"|"+ fals +"\\b","g");
    let newStr = origStr.replace(regex, function randomBoolExp(match){
    let equivBoolExpsTru = [
      `!${fals}`, 
      `${tru} && ${tru}`,
      `${tru} || ${tru}`,
      `${tru} || ${fals}`,
      `${fals} || ${tru}`,
      `1`
      ];
    let equivBoolExpsFals = [
      `!${tru}`, 
      `${fals} || ${fals}`,
      `${fals} && ${fals}`,
      `${tru} && ${fals}`,
      `${fals} && ${tru}`,
      `0`
      ];
    let randIdx = Math.floor(Math.random()*6);
    let randExpTru = equivBoolExpsTru[randIdx];
    let randExpFals = equivBoolExpsFals[randIdx];
    if (match === tru){
      return `(${randExpTru})`;
    }
    else if (match === fals){
      return `(${randExpFals})`;
    }
    else{
      return 'PROBLEM!!';
    }
  });
  return newStr;      
  }
  // MAKE NUMBERS WORSE
  function makeNumbersWorse(origStr){
    let newStr = origStr.replaceAll(/\d+(\.\d+)?/g, function randEquation(match){
      let operations = ['+','-','*','/'];
      let oppositeOpps = {
        '+':'-',
        '-':'+',
        '*':'/',
        '/':'*'
      };
      let randOpp = operations[(Math.floor(Math.random()*4))];
      let oppOpp = oppositeOpps[randOpp];
      let randNum = '1';
      if (randOpp === '+' || randOpp === '-'){
        randNum = String(Math.floor(Math.random()*11));
      }
      if (randOpp === '*' || randOpp === '/'){ // we do this to avoid issues w dividing by 0
        randNum = String(Math.floor((Math.random()*11)+1));
      }
      let complNum = String(eval(match + oppOpp + randNum));
      let replacement = `(${complNum} ${randOpp} ${randNum})`;
      return replacement;
    });
    return newStr;
  }
  // MAKE VARIABLE NAMES WORSE
  function makeVarNamesWorse(origStr){
    let newStr = origStr;
    let varNames = Array.from(origStr.matchAll(/(let|const|var|function)(\s)(\w+)(\s|\()/g)).map(match => match[Math.floor(3)]);
    let varNamesNoDupl = [];
    for (let idx = 0; idx < varNames.length; idx++){
      if (!varNamesNoDupl.includes(varNames[idx])){
        varNamesNoDupl.push(varNames[idx]);
      }
    }
    let replacementDict = {};
    function replacer(match){
      var availChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_'
      if (match === 'fs' || match === 'for' || match === 'while'){
        return match;
      }
      let randVarName = '';
      for (let idx = 0; idx < match.length + Math.floor(Math.random()*10); idx++){
        randVarName += availChars[Math.floor(Math.random()*49)];
      }
      return randVarName;
    }
    varNamesNoDupl.forEach(key => replacementDict[key] = replacer(key));
    Object.keys(replacementDict).forEach(key => {
      newStr = newStr.replaceAll(key, replacementDict[key]);
    });
    return newStr;
  }
  return(makeVarNamesWorse(makeNumbersWorse(makeBoolLiteralsWorse(makeBoolExpressionsWorse(code)))));
}

// naming the new file and creating a var for the current one's path
let cmdLnArg = (process.argv);
let thisFilePath = cmdLnArg[Math.floor(1)];
let newFilePath = thisFilePath.slice(0,Math.floor(-3)) + 'ButWorse.js'

//
let codeToEdit = fs.readFileSync(thisFilePath).toString();
let content = madeWorse(codeToEdit);

// write the new file
try {
  let newFile = fs.writeFileSync(newFilePath, content);
  //file written successfully
} catch (err) {
  console.error(err);
}

