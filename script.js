const queArray = [
  
  {
    question: "Over the past two weeks, how often have you felt really sad or down?",
    options: ["Not at all", "Rarely", "Sometimes", "Often", 'Almost always'],
    scores: [1, 2, 3, 4, 5]
  },
  
  {
    question: "In the last month, how often have you had trouble sleeping, either difficulty falling asleep or staying asleep?",
    options: ["Not at all", "Rarely", "Sometimes", "Often", 'All the time'],
    scores: [1, 2, 3, 4, 5]
  },
  
  {
    question: "Over the past six months, how often have you found it hard to concentrate or make decisions?",
    options: ["Not at all", "Rarely", "Sometimes", "Often", 'Constantly'],
    scores: [1, 2, 3, 4, 5]
  },
  
  {
    question: "In the last year, how often have you lost interest in activities you used to enjoy?",
    options: ["Not at all", "Rarely", "Sometimes", "Often", 'Almost always'],
    scores: [1, 2, 3, 4, 5]
  },
  
  {
    question: "Over the last six months, how often have you felt unusually angry or easily irritated?",
    options: ["Not at all", "Rarely", "Sometimes", "Often", 'All the time'],
    scores: [1, 2, 3, 4, 5]
  },
  
  {
    question: "In the past month, have you had thoughts of hurting yourself or others?",
    options: ["No", "Rarely, and I wouldn't act on them", "Sometimes, and I wouldn't act on them", "Yes, and I'm worried I might act on them", "Yes, and I'm planning to act on them"],
    scores: [1, 2, 3, 4, 5]
  },
  
  {
    question: "How would you rate your social interactions over the past year?",
    options: ["Excellent", "Good", "Okay", "Not great", "I've been avoiding people"],
    scores: [1, 2, 3, 4, 5]
  },
  
  {
    question: "In the last six months, have you seen or heard things that aren't really there or believed things that don't make sense to others?",
    options: ["Not at all", "Rarely", "Sometimes", "Often", "All the time"],
    scores: [1, 2, 3, 4, 5]
  },
  
  {
    question: "Have you struggled with alcohol or drug problems in the past year?",
    options: ["No", "Yes, in the past", "Yes, currently dealing with it", "None of this"],
    scores: [1, 2, 3, 4]
  },
  
  {
    question: "Over the past three months, how much have your eating habits or weight changed?",
    options: ["No changes", "Small changes", "Moderate changes", "Significant changes, losing appetite or weight", "Significant changes, eating a lot more or gaining weight  "],
    scores: [1, 2, 3, 4, 5]
  },

];

function popUp(value) {

  if (value === 'open') {
    const targetElement = document.getElementById("card");
    targetElement.style.display = 'block';
  }

  else if (value === 'close') {

    const targetElement = document.getElementById("card");
    targetElement.style.display = 'none';

  }

  else if (value === 'open-model') {

    const ele = document.getElementById("model");
    ele.style.display = 'block';

  }

  else if (value === 'close-model') {

    const ele = document.getElementById("model");
    ele.style.display = 'none';

  }

  else if (value === 'closeCardAndpopUp') {

    const ele = document.getElementById("model");
    ele.style.display = 'none';

    const targetElement = document.getElementById("card");
    targetElement.style.display = 'none';

  }

  else if (value === 'clearAndClose') {

    const ele = document.getElementById("model");
    ele.style.display = 'none';

    let targetElement = document.getElementById('welcomeMessage')
    targetElement.style.display = 'block';
    
    deleteAllChildElements();

  }

}

var userResponses = {};
function updateArray(index, value, score) {
  if (userResponses[index] === undefined) {
    userResponses[index] = { value: [], score: 0 };
  }

  const valueIndex = userResponses[index].value.indexOf(value);

  if (valueIndex !== -1) {
    userResponses[index].value.splice(valueIndex, 1);
    userResponses[index].score -= score;
  } else {
    userResponses[index].value.push(value);
    userResponses[index].score += score;
  }
}

function doesValueExist(index, value) {
  return userResponses[index] && userResponses[index].value.includes(value);
}

function checkboxClicked(index, options, value, score) {
  if (isAnyCheckboxChecked(options)) {
    enableDisableNextButtons(false);
    updateArray(index, value, score);
  } else {
    enableDisableNextButtons(true);
  }
}




























function deleteAllChildElements() {

  var parentElement = document.getElementById("message-section");
  if (parentElement) {

    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
    }

  }

}

function enableDisableNextButtons(enable) {

  var sendBtn = document.getElementById("sendBtn");
  sendBtn.disabled = !enable;

}

function enableDisablePrevButtons(enable) {

  var prevBtn = document.getElementById("prevBtn");
  prevBtn.disabled = !enable;

}

function isAnyCheckboxChecked(options) {

  for (var i = 0; i < options.length; i++) {
    var checkbox = document.getElementById(i);
    
    if (checkbox.checked) {
      return true;
    }

  }
  return false;

}


function checkboxClicked(index ,options, value, score) {
  console.log(userResponses)
  if (isAnyCheckboxChecked(options)) {
    
    enableDisableNextButtons(true);
    updateArray(index,value, score)
  
  }
  
  else {

    enableDisableNextButtons(false);
  
  }

}

function createOptions(index ,question, options, scores) {

  var targetElement = document.getElementById("message-section");
  var parentElement = document.createElement("div");
  var questionParagraph = document.createElement("div");

  parentElement.classList.add('questionDiv');
  questionParagraph.classList.add("pt-3");

  questionParagraph.appendChild(document.createTextNode((index+1)+". "+question));
  parentElement.appendChild(questionParagraph);

  for (var i = 0; i < options.length; i++) {

    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    var label = document.createElement("label");

    if (i === 0) {
      
      label.htmlFor = i;
      checkBox.value = options[i];
      checkBox.id = i;
      
      checkBox.setAttribute("data-score", scores[i]);

      if (doesValueExist(index , options[i])) {
        checkBox.checked = true;
        enableDisableNextButtons(false);
      }

      (function (index ,options, value, score) {
        checkBox.addEventListener("click", function () {
          checkboxClicked(index, options, value, score);
        });
      })(index, options, options[i], scores[i]);

    }
    else if (i === 1) {

      label.htmlFor = i;
      checkBox.value = options[i];
      checkBox.id = i;
      
      checkBox.setAttribute("data-score", scores[i]);

      if (doesValueExist(index , options[i])) {
        checkBox.checked = true;
      }

      (function (index ,options, value, score) {
        checkBox.addEventListener("click", function () {
          checkboxClicked(index ,options, value, score);
        });
      })(index ,options, options[i], scores[i]);

    }

    else if (i === 2) {

      label.htmlFor = i;
      checkBox.value = options[i];
      checkBox.id = i;
      
      checkBox.setAttribute("data-score", scores[i]);

      if (doesValueExist(index , options[i])) {
        checkBox.checked = true;
      }

      (function (index ,options, value, score) {
        checkBox.addEventListener("click", function () {
          checkboxClicked(index,options, value, score);
        });
      })(index, options, options[i], scores[i]);

    }

    else if (i === 3) {

      label.htmlFor = i;
      checkBox.value = options[i];
      checkBox.id = i;
      
      checkBox.setAttribute("data-score", scores[i]);

      if (doesValueExist(index , options[i])) {
        checkBox.checked = true;
      }

      (function (index ,options ,value, score) {
        checkBox.addEventListener("click", function () {
          checkboxClicked(index ,options, value, score);
        });
      })(index,options, options[i], scores[i]);

    }

    else if (i === 4) {

      label.htmlFor = i;
      checkBox.value = options[i];
      checkBox.id = i;
      
      checkBox.setAttribute("data-score", scores[i]);

      if (doesValueExist(index , options[i])) {
        checkBox.checked = true;
      }

      (function (index,options, value, score) {
        checkBox.addEventListener("click", function () {

          checkboxClicked(index,options, value, score);
        });
      })(index,options, options[i], scores[i]);

    }

    label.appendChild(document.createTextNode(options[i]));
    
    parentElement.appendChild(checkBox);
    parentElement.appendChild(label);
    parentElement.appendChild(document.createElement("br"));
    
    targetElement.appendChild(parentElement);

  }

}

function addResult(condition) {

  var targetElement = document.getElementById('message-section')
  var container = document.createElement('div');
  
  var childDiv = document.createElement('div');
  var anchorTag = document.createElement('a');

  childDiv.textContent = `Thank You! You SCORE is ${finalResult}   i will suggest you the list of top`;


  if (condition) {

    anchorTag.textContent = 'Psychiatrist';
    anchorTag.setAttribute('href', 'https://dev.rhope.in/search/doctor/Psychiatrist');

  }
  else {

    anchorTag.textContent = 'Psychologist';
    anchorTag.setAttribute('href', 'href="https://dev.rhope.in/search/doctor/Psychologist');

  }

  container.appendChild(childDiv);
  container.appendChild(anchorTag);
  
  targetElement.appendChild(container);

}

function nextQuestion() {

  if (index < queArray.length - 1) {

    index = ++index;
    enableDisableNextButtons(false)
    enableDisablePrevButtons(true);
    
    deleteAllChildElements();
    questions(index);

  }

  else {

    enableDisableNextButtons(true);
    enableDisablePrevButtons(false);
    
    deleteAllChildElements()
    addResult(true);

  }

}

function previousQuestion() {

  if (index > 0) {

    index = --index;
    
    deleteAllChildElements()
    questions(index);

  }

  if(index === 0) {
    enableDisablePrevButtons(false);
  }

}

function questions(index) {

  createOptions( index ,queArray[index].question, queArray[index].options, queArray[index].scores)

}

function notSure() {

  index = 0;
  
  let targetElement = document.getElementById('welcomeMessage')
  targetElement.style.display = 'none';

  let messageElement = document.getElementById('message-section')
  messageElement.style.display = 'block';

  questions(index)

}