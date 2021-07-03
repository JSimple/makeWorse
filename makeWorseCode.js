const fs = require('fs') // import node fs

function madeWorse(code){
 /// MAKE NUMBERS WORSE
    function makeNumbersWorse(codeString){
        function replacer(match){
            let matchButWorse = `(${match} + 0)`
            return matchButWorse;
        }
        codeString = codeString.replace(/\d+/g, replacer) // replace all the numbers using the replacer function
       // return codeString
    }
    /// return makeNumbersWorse(code);

    // MAKE BOOLEAN EXPRESSIONS WORSE
    function makeBoolExpressionsWorse(codeString){ 
        //find every time 'if(' or 'while(' appears
        //append '1 && '
        function replacer(match){
            let matchButWorse = `(${match}1 && )`
            return matchButWorse;
        }
        codeString = codeString.replace(/(if\()|(while\()/g, replacer);
        return codeString;
    }

    // MAKE BOOLEAN PRIMITIVES WORSE
    // function makeBoolPrimitivesWorse{
    // }
    return makeBoolExpressionsWorse(code);
}

// naming the new file and creating a var for the current one's path
let cmdLnArg = (process.argv);
let thisFilePath = cmdLnArg[1]
let newFilePath = thisFilePath.slice(0,-3) + 'ButWorse.js'

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

