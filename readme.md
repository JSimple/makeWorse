# makeWorseCode

makeWorseCode is a JavaScript program that I made for my own education and amusement.  
It’s a program that edits its own code to be less efficient while preserving functionality. 
It’s a work-in-progress, but is already operational enough to be entertaining (to me, at least).
The current version does not edit the program code directly, rather it creates a new program file with the less efficient code.
The code can currently run for 5 - 7 generations without running into any errors.
The identified errors that occur around the 5th - 7th generation are due to rounding problems with floating point numbers. I'm going to work on this.

## Installation

just download the makeWorse directory from GitHub (you can send me pull request). 
makeWorseCode should then run in any enviornment that supports node JS.
(You will need to install the latest version of node to run the program.)

## Usage

```
# node makeWorseCode.js
creates a new file, "makeWorseCodeButWorse.js", that has the same funtionality as makeWorseCode.js but is written less efficiently.
You can then run this new Program and it will make a new file "makeWorseCodeButWorseButWorse.js" 
This program will also the same funtionality as makeWorseCode.js but is written even less efficiently.
You can run this program too, and so on forever (in theory). 
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[Josephine_Maya_Simpe](https://josephinesimple.com/licenses/this_isnt_a_real_url/but_do_please_repect_this_program_and_the_idea_behind_it_as_my_intellectual_property)
