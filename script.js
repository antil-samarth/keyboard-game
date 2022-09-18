const words = [
    'jazz',
	'improbable',
    'deceptive',
    'deductions',
    'exception',
    'invent',
    'person',
    'last',
];

localStorage.setItem('highscore', 0);

let startFlag = true;
let highScore = 0;
let displayWord = {} ;
let errorCount = 0;
let isDone = false;

const hWordElement = document.getElementById('hWord');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const highScoreElement = document.getElementById('highscore');
const hManImage = document.getElementById('hMan');
hManImage.className = 'invisible';

document.getElementById('start').addEventListener('click', () => {
    
    const wordIndex = Math.floor(Math.random() * words.length); /* randomly selects a word */
    
    const word = words[wordIndex];
    letters = word.split('');
    letterIndex = 0;
	console.log(letters)
    
	displayWord = letters.map(function (letter) {
		if (letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u'){
			return `<span>${letter} </span>`
		} else {
			
			return `<span>_ </span>`
		}
	})

    hWordElement.innerHTML = displayWord.join(''); 

    messageElement.innerText = '';

    typedValueElement.value = '';

    typedValueElement.focus();

    typedValueElement.disabled = false;
    startFlag = true;
	hManImage.src = "./images/h1.jpg";
	hManImage.className = ''
	errorCount = 0;
	isDone = false;
});


if (startFlag) {
	typedValueElement.addEventListener('input', function _listener() {
	    const currentLetter = letters[letterIndex];
	    const typedValue = typedValueElement.value;
		console.log(currentLetter);
		console.log(letterIndex);
		if (letters.includes(typedValue)) {
			letters.forEach(x => {
				if (typedValue === x) {
					
					i = letters.indexOf(x);
					displayWord[i] = `<span>${x} </span>`;
					hWordElement.innerHTML = displayWord.join('');

					letters[i] = 0;
				} 
			});
			
			isDone = true;
			letters.forEach(d => {
				if (d !== 0) {
					isDone = false;
				}
			});
			
			if(isDone) {
				const message = `You won!`;
	
	        	messageElement.innerText = message;
	
	        	typedValueElement.disabled = true;
	
	        	/*if (highScore < wpm) {
	            
	        	}
	
	        	const highScoreMessage = `Highscore => `;
	        	highScoreElement.innerText = highScoreMessage;*/
	
	        	setTimeout(() => {
	                alert('Success!');
	            }, 10);
            
           		startFlag = false;
			}

		} else{
			typedValueElement.className = 'error';
			errorCount++;
			switch (errorCount) {
				case 1:
					hManImage.src = "./images/h2.jpg";
					break;
				case 2:
					hManImage.src = "./images/h2.jpg";
					break;
				case 3:
					hManImage.src = "./images/h3.jpg";
					break;
				case 4:
					hManImage.src = "./images/h4.jpg";
					break;
				case 5:
					typedValueElement.disabled = true;
					startFlag = false;
					const message = `You lost!`;
	
	        		messageElement.innerText = message;
					setTimeout(() => {
						alert('You Lost!!');
					}, 10);
			}
			console.log(errorCount);
	    }
	}, true);
}