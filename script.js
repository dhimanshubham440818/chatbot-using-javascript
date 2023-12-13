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

var userResponses = {};

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
    userResponses = {};
    const ele = document.getElementById("model");
    ele.style.display = 'none';
    let targetElement = document.getElementById('welcomeMessage')
    targetElement.style.display = 'block';
    var parentElement = document.getElementById("message-section");
    if (parentElement) {
      while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
      }
    }
  }
}

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

function enableDisable(targetElement, value) {
  var prevBtn = document.getElementById(targetElement);
  prevBtn.disabled = !value;
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
function checkboxClicked(index, options, value, score) {
  updateArray(index, value, score)
  if (isAnyCheckboxChecked(options)) {
    enableDisable('sendBtn', true)
  } else {
    enableDisable('sendBtn', false)
  }
}
function createOptions(index, question, options, scores) {
  var targetElement = document.getElementById("message-section");
  var parentElement = document.createElement("div");
  var questionParagraph = document.createElement("div");
  parentElement.classList.add('questionDiv');
  questionParagraph.classList.add("pt-3");
  questionParagraph.appendChild(document.createTextNode((index + 1) + ". " + question));
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
      if (doesValueExist(index, options[i])) {
        checkBox.checked = true;
        enableDisable('sendBtn', true)
      }

      (function (index, options, value, score) {
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
      if (doesValueExist(index, options[i])) {
        checkBox.checked = true;
        enableDisable('sendBtn', true)
      }
      (function (index, options, value, score) {
        checkBox.addEventListener("click", function () {
          checkboxClicked(index, options, value, score);
        });
      })(index, options, options[i], scores[i]);
    }
    else if (i === 2) {
      label.htmlFor = i;
      checkBox.value = options[i];
      checkBox.id = i;
      checkBox.setAttribute("data-score", scores[i]);
      if (doesValueExist(index, options[i])) {
        checkBox.checked = true;
        enableDisable('sendBtn', true)

      }
      (function (index, options, value, score) {
        checkBox.addEventListener("click", function () {
          checkboxClicked(index, options, value, score);
        });
      })(index, options, options[i], scores[i]);
    }
    else if (i === 3) {
      label.htmlFor = i;
      checkBox.value = options[i];
      checkBox.id = i;
      checkBox.setAttribute("data-score", scores[i]);
      if (doesValueExist(index, options[i])) {
        checkBox.checked = true;
        enableDisable('sendBtn', true)
      }
      (function (index, options, value, score) {
        checkBox.addEventListener("click", function () {
          checkboxClicked(index, options, value, score);
        });
      })(index, options, options[i], scores[i]);
    }
    else if (i === 4) {
      label.htmlFor = i;
      checkBox.value = options[i];
      checkBox.id = i;
      checkBox.setAttribute("data-score", scores[i]);
      if (doesValueExist(index, options[i])) {
        checkBox.checked = true;
        enableDisable('sendBtn', true)
      }
      (function (index, options, value, score) {
        checkBox.addEventListener("click", function () {
          checkboxClicked(index, options, value, score);
        });
      })(index, options, options[i], scores[i]);
    }
    label.appendChild(document.createTextNode(options[i]));
    parentElement.appendChild(checkBox);
    parentElement.appendChild(label);
    parentElement.appendChild(document.createElement("br"));
    targetElement.appendChild(parentElement);
  }
}

let index = 0;
function quick(value) {
  if (value === 'notsure') {
    index = 0;
    let targetElement = document.getElementById('welcomeMessage')
    targetElement.style.display = 'none';
    let messageElement = document.getElementById('message-section')
    messageElement.style.display = 'block';
    createOptions(index, queArray[index].question, queArray[index].options, queArray[index].scores);
  }
  else if (value === 'next') {
    if (index < queArray.length - 1) {
      index = ++index;
      enableDisable('sendBtn', false)
      var parentElement = document.getElementById("message-section");
      if (parentElement) {
        while (parentElement.firstChild) {
          parentElement.removeChild(parentElement.firstChild);
        }
      }
      enableDisable('prevBtn', true);
      createOptions(index, queArray[index].question, queArray[index].options, queArray[index].scores);
    }
    else {
      var parentElement = document.getElementById("message-section");
      if (parentElement) {
        while (parentElement.firstChild) {
          parentElement.removeChild(parentElement.firstChild);
        }
      }
      addResult(true);
    }
  }
  else if (value === 'prev') {
    if (index > 0) {
      enableDisable('sendBtn', false);
      index = --index;
      var parentElement = document.getElementById("message-section");
      if (parentElement) {
        while (parentElement.firstChild) {
          parentElement.removeChild(parentElement.firstChild);
        }
      }
      createOptions(index, queArray[index].question, queArray[index].options, queArray[index].scores);

      if (index === 0) {
        enableDisable('prevBtn', false);
      }
    }
  }
}

function addResult(condition) {
  console.log(userResponses)
  let targetElement = document.getElementById('message-section')
  let container = document.createElement('div');
  let childDiv = document.createElement('div');
  let anchorTag = document.createElement('a');
  childDiv.textContent = `Thank You! You SCORE is ${ 0 }   i will suggest you the list of top`;
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