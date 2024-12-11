const display = document.getElementsByClassName("display"); 

function Append(input) {
    console.log(`Appending: ${input}`); // Debug
    display.value += input; 
}


function Clear() {
    display.value = ""; 
}

function Calculate() {
    try {
        display.value = eval(display.value); 
    } catch (error) {
        display.value = "Error"; 
    }
}

