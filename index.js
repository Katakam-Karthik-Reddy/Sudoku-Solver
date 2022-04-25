//This is an arr to store the value from the board
let arr = []

// This is an function which is constantly listing the sudoku board if we enter
// any key it check if it is number or character if is character then we will 
// set it to "" or it will be number we will set it with first character of the string 
document.getElementById("sudoku-board").addEventListener("keyup", function (event) { // here we are waiting for key to be pressed
    if (event.target && event.target.nodeName == "TD") { // if pressed then we check whether it is element td or not 
        var tdel = event.target 
        var range = /[1-9]/
        if (tdel.innerText.length > 0 && range.test(tdel.innerText[0])) { // here we are checking whether string inside the td is valid or not
            tdel.innerText = tdel.innerText[0]  // if it is then we are setting the first index character
        } else {
            tdel.innerText = "" // if it is not then we are setting it to empty string
        }
    }
})


//This is an function is called when solve button is clicked 

document.getElementById("solve-button").addEventListener("click", solver)

function solver() {
    let str = boardtoarr(); // here we are converting board values to string
    let arr = strtoarr(str); // here we are converting string into array 
    let isvalid = isValid(arr) // here we are checking that whether board is valid or not 
    if (isvalid) {
        solve(arr) // if board is valid then we will proceed to solving the board
    }
    else{
        alert("Board is inValid") // if board is not valid then we will alert the user with popup on the screen
    }


}



// This is an function to convert board to array
function boardtoarr() {
    let string = ""
    var range = /[1-9]/
    let tds = document.getElementsByTagName('td') // here we are getting all the td in the html page
    for (let i = 0; i < tds.length; i++) { 
        if (range.test(tds[i].innerText[0])){  // here we are checking the value in every td whether it is in the range of 1 to 9
            string += tds[i].innerText // if it is in the range then we will append that value to the string
        } else {
            string += "-" // if it not in the range then we will append "-" to the string
        }

    }
    return string // In the end of the function we return the string
}

// This function is to convert string to 2d array
function strtoarr(string) {
    let arr = []    // here we are creating array to store the array 

    for (let i = 0; i < 9; i++) {
        let temp = []   // This is temp array
        for (let j = 0; j < 9; j++) {
            temp[j] = string[(i*9) + j] //here we are appending the character at that index to array
        }
        arr[i] = temp   // here we are appending temp array to arr 
    }
    return arr  // return the 2d array in the end of the function
}


//This function is used to check if board is vaild or not
function isValid(array) {
    var range = /[1-9]/
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (range.test(array[i][j])) {  // here we are checking whether value at the index is in the range of 1 to 9
                if (isSafe(array, i, j)) { // here we are checking whether is it safe with this value at this index
                    continue    // if it is then we will continue
                } else {
                    return false    // if it is not then we will return false
                }
            }
        }
    }
    return true;    // if we reached to this stage then it is safe to leave this value here
}

function isSafe(array, i, j) {
    // This for loop is checking the row 
    for (let r = 0; r < 9; r++) {
        if (r != i && array[r][j] == array[i][j]) { 
            return false    // if there are duplicates in that row then we return false
        }
    }
    // This for loop is checking the col
    for (let c = 0; c < 9; c++) {
        if (c != j && array[i][c] == array[i][j]) {
            return false   // if there are duplicates in that col then we return false
        }
    }
    // This below two line are used to get the start index of requried box (3*3)
    let rr = i - (i % 3)    
    let cc = j - (j % 3)

    // This for loops are checking duplicates in that box
    for (let t = rr; t < rr + 3; t++) {
        for (let h = cc; h < cc + 3; h++) {
            if (!(t == i && h == j) && array[i][j] == array[t][h]) {
                return false;
            }
        }
    }
    return true // if we are at this stage then it is to leave that value at that location
}

//This is the main funtion to solve the problem
function solve(array) {
    let a = 0,
        b = 0
    let range = /[1-9]/
    let solvedarray = solvehelper(array, a, b)  // This is helper function which makes our life's easy to make a recursive funtion
    arrtoboard(solvedarray)


    function solvehelper(arra, row, col) {
        if (row == 8 && col == 9) {
            return arra // if this is true somehow we reached to end which mean we have solved the board
        }

        if (col == 9) { //if col index is 9 which is out bound we increase row number and set col to 0
            row++
            col = 0
        }

        if (arra[row][col]!="-") {
            return solvehelper(arra, row, col + 1)  // if there is an value already present at that index then we proceed to next box
        } else {
            for (let num = 1; num <= 9; num++) { // here we try every value from 1 to 9 
                arra[row][col] = num    // here we set one the 9 possible value
                if (isSafe(arra, row, col)) {   // here we check whether the value we just placed is safe or not 
                    if (solvehelper(arra, row, col + 1)) { // if it is safe then we move to next box
                        return arra // if we are able to solve then we retuen solved array
                    }
                }
                arra[row][col] = "-"    // if it is not safe then we make it back to "-"

            }

        }
        
    }
}

// This function is used to convet or set the board values from solved array
function arrtoboard(array){
    var tds = document.getElementsByTagName('td')   // here we are getting all the td's in the html page
    for(let i =0;i<9;i++){
        for(let j = 0;j<9;j++){
            tds[(i*9)+j].innerText = array[i][j]    // here we are setting the values from array to board
        }
    }
}

// This is an function to clear the board
document.getElementById("clear-button").addEventListener("click", clearboard) 

function clearboard() {
    var tds = document.getElementsByTagName('td')
    for (var i = 0; i < tds.length; i++) {
        tds[i].innerText = ""  // here we loop through all the td's then we set then to empty string
        console.log("clear")
    }
}



//dark mode
var checkbox = document.getElementById("dark-mode")
checkbox.addEventListener("click", function(event){
    if(checkbox.checked){
        document.querySelector("body").style.background = "#1d2a35"
        document.querySelectorAll("colgroup").forEach(function (ele){
            ele.style.border = " #dddddd solid medium"
        })
        document.querySelectorAll("tbody").forEach(function(ele){
            ele.style.border = " #dddddd solid medium"
        })
        document.querySelectorAll("td").forEach(function(ele){
            ele.style.border = " #dddddd solid thin"
        })
        document.querySelector("table").style.color = "#dddddd"
        document.querySelector("#nav").style.backgroundColor = "#2f5372"
    
    }
    else{
        document.querySelector("body").style.removeProperty('background')
        document.querySelectorAll("colgroup").forEach(function (ele){
            ele.style.border = "solid medium"
        })
        document.querySelectorAll("tbody").forEach(function(ele){
            ele.style.border = "solid medium"
        })
        document.querySelectorAll("td").forEach(function(ele){
            ele.style.border = "solid thin"
        })
        document.querySelector("table").style.color = ""
        document.querySelector("#nav").style.backgroundColor = "#f0f0f0"
    }
})