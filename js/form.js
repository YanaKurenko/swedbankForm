
let currentQuestion = 1;


function showQuestion(questionNumber) {
    for (let i = 1; i <= 5; i++) {
        const questionDiv = document.getElementById('question' + i);
        questionDiv.style.display = i === questionNumber ? 'block' : 'none';
    }

}

function showFinalPart() {
    const finalPartDiv = document.getElementById('finalPart');
    finalPartDiv.style.display = 'block';

    // hide the question blocks
    for (let i = 1; i <= 5; i++) {
        const questionDiv = document.getElementById('question' + i);
        questionDiv.style.display = 'none';
    }
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.innerText = message;
    errorDiv.style.display = 'block';
}

function hideError() {
    const errorDiv = document.getElementById('error');
    errorDiv.innerText = '';
    errorDiv.style.display = 'none';
}

function startQuestionnaire() {
    const introDiv = document.getElementById('intro');
    introDiv.style.display = 'none';
    showQuestion(currentQuestion);
   
}

function nextQuestion() {
    // check if the current question has a valid answer before proceeding
    const currentQuestionDiv = document.getElementById('question' + currentQuestion);

    if (currentQuestion === 3) {
        const selectInput = currentQuestionDiv.querySelector('select[name="q3"]');
        if (selectInput.value !== '') {
            hideError();
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            // display an error message if the current question has no valid answer
            showError("Please select an answer before proceeding to the next question.");
        }
    } else {
        const inputs = currentQuestionDiv.querySelectorAll('input[name="q' + currentQuestion + '"]');
        const hasAnswer = Array.from(inputs).some(input => {
            if (input.type === 'checkbox') {
                return input.checked;
            } else if (input.type === 'radio') {
                return input.checked;
            } else if (input.type === 'number') {
                return input.value !== ' ';
            } else if (input.type === 'textarea') {
                return input.value.trim() !== '';
            }
            return false;
        });

        if (hasAnswer && currentQuestion < 5) {
            hideError();
            currentQuestion++;
            showQuestion(currentQuestion);
        } else if (hasAnswer && currentQuestion === 5) {
            hideError();
            showFinalPart();

            document.getElementById('resultQ1').innerText = document.querySelector('input[name="q1"]:checked').value;
            document.getElementById('resultQ2').innerText = [...document.querySelectorAll('input[name="q2"]:checked')].map(el => el.value).join(", ");
            document.getElementById('resultQ3').innerText = document.querySelector('select[name="q3"]').value;
            document.getElementById('resultQ4').innerText = document.querySelector('input[name="q4"]').value;
            document.getElementById('resultQ5').innerText = document.querySelector('textarea[name="q5"]').value;
        } else {
            // display an eror message if the current question has no valid answer
            showError("Please select an answer before proceeding to the next question.");
        }
    }
}

function previousQuestion() {
    if (currentQuestion > 1) {
        hideError();
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

document.getElementById("questionnaireForm").addEventListener("submit", function (e) {
    e.preventDefault(); // prevent form submission to the server

    // display the final part with answers and hide the question blocks
    showFinalPart();

    // update the displayed answers
    document.getElementById('resultQ1').innerText = document.querySelector('input[name="q1"]:checked').value;
    document.getElementById('resultQ2').innerText = [...document.querySelectorAll('input[name="q2"]:checked')].map(el => el.value).join(", ");
    document.getElementById('resultQ3').innerText = document.querySelector('select[name="q3"]').value;
    document.getElementById('resultQ4').innerText = document.querySelector('input[name="q4"]').value;
    document.getElementById('resultQ5').innerText = document.querySelector('textarea[name="q5"]').value;
});
function showTooltipModal() {
    const modal = document.getElementById('tooltipModal');
    modal.style.display = 'block';
    
    
    modal.addEventListener('click', function(event) {
     
      if (event.target === modal) {
        hideTooltipModal();
      }
    });
  }
  
  function hideTooltipModal() {
    const modal = document.getElementById('tooltipModal');
    modal.style.display = 'none';
  }