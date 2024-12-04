// Card Data
const cardData = [
  { shape: 'circle', color: null },
  { shape: 'square', color: null },
  { shape: 'star', color: null },
  { shape: 'triangle', color: null },
  { shape: 'hexagon', color: null },
  { shape: 'heart', color: null }
];

const colors = ['cyan', 'blue', 'green', 'yellow', 'pink', 'orange'];
  
  // Experiment Configuration
  const config = {
    totalTrials: 6,
    currentTrial: 0,
    results: [],
    condition: null, // 'active' or 'passive'
    focusAttribute: null, // 'colour' or 'shape'
    startTime: null,
    participantIndex: 0
  };
  
  function assignCondition() {
    const conditions = ['active', 'passive'];
    const focusAttributes = ['colour', 'shape'];
  
    if (config.participantIndex % 4 === 0) {
      shuffleArrayInPlace(conditions);
      shuffleArrayInPlace(focusAttributes);
    }
  
    config.condition = conditions[config.participantIndex % 2];
    config.focusAttribute = focusAttributes[config.participantIndex % 2];
    config.participantIndex++;
  }
  
  function shuffleArrayInPlace(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function startExperiment() {
    document.getElementById('welcome').classList.add('hidden');
    document.getElementById('informed-consent').classList.remove('hidden');
  }
  
  function startInstructions() {
    document.getElementById('informed-consent').classList.add('hidden');
    document.getElementById('instructions').classList.remove('hidden');
    assignCondition();
    displayInstructions();
  }
  
  function displayInstructions() {
    const instructionsContent = document.getElementById('instructions-content');
    instructionsContent.innerHTML = `
    <ul class="study-info">
      <li><p>In this experiment, you will be <span class="dynamic-text">${config.condition === 'active' ? 'actively flipping cards' : 'observing a pre-recorded sequence of card flips'}</span> to reveal their shapes and colours.</p></li>
      <li><p>Try to remember the <span class="dynamic-text">${config.focusAttribute === 'colour' ? 'shape' : 'colour'}</span> of the cards.</p></li>
      <li><p>The cards will automatically flip back after 2 seconds.</p></li>
      <li><p>Click 'Continue' when you feel comfortable moving onto the next task.</p><li/>
      <li><p>Focus on engaging with the game, paying attention to the stimuli presented.</p></li></ul>
    `;
  }
  
  function startTask() {
    document.getElementById('instructions').classList.add('hidden');
  
    if (config.condition === 'active') {
      document.getElementById('active-task').classList.remove('hidden');
      startActiveTask();
    } else {
      document.getElementById('passive-task').classList.remove('hidden');
      startPassiveTask();
    }
  }
  
  function startActiveTask() {
    document.getElementById('instructions').classList.add('hidden');
    document.getElementById('active-task').classList.remove('hidden');
    config.startTime = Date.now();
    showCards();
  }
  
  function showCards() {
    if (config.currentTrial >= config.totalTrials) {
      showRecognitionTest();
      return;
    }
  
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
  
    const cardOrder = shuffleArray([...cardData]);
    const shuffledColors = shuffleArray([...colors]);
  
    cardOrder.forEach((card, index) => {
      card.color = shuffledColors[index];
      const cardElement = createCard(card, index);
      cardsContainer.appendChild(cardElement);
    });
  }
  
  function createCard(card, index) {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card';
    cardContainer.addEventListener('click', () => flipCard(cardContainer));
  
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
  
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    // The front is now empty
  
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.innerHTML = createSVGShape(card.shape, card.color);
  
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardContainer.appendChild(cardInner);
  
    return cardContainer;
  }
  
  function createSVGShape(shape, color) {
    let svgPath = '';
    switch (shape) {
      case 'circle':
        svgPath = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: ${color};transform: ;msFilter:;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z"></path></svg>`;
        break;
      case 'square':
        svgPath = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: ${color};transform: ;msFilter:;"><path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"></path></svg>`;
        break;
      case 'star':
        svgPath = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: ${color};transform: ;msFilter:;"><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg>`;
        break;
      case 'triangle':
        svgPath = `<<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: ${color};transform: ;msFilter:;"><path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z"></path></svg>`;
        break;
      case 'hexagon':
        svgPath = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: ${color};transform: ;msFilter:;"><path d="m21.707 7.293-5-5A.996.996 0 0 0 16 2H8a.996.996 0 0 0-.707.293l-5 5A.996.996 0 0 0 2 8v8c0 .266.105.52.293.707l5 5A.996.996 0 0 0 8 22h8c.266 0 .52-.105.707-.293l5-5A.996.996 0 0 0 22 16V8a.996.996 0 0 0-.293-.707z"></path></svg>`;
        break;
      case 'heart':
        svgPath = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: ${color};transform: ;msFilter:;"><path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path></svg>`;
        break;
    }
    return `<svg viewBox="0 0 100 100">${svgPath}</svg>`;
  }
  

  function flipCard(cardElement) {
    if (!cardElement.classList.contains('flipped')) {
      cardElement.classList.add('flipped');
      setTimeout(() => {
        cardElement.classList.remove('flipped');
      }, 2000);
  
      // Record interaction logs
      const index = Array.from(cardElement.parentNode.children).indexOf(cardElement);
      const card = cardData[index];
      config.results.push({
        trial: config.currentTrial + 1,
        cardIndex: index,
        cardShape: card.shape,
        cardColor: card.color,
        revealTime: Date.now() - config.startTime
      });
  
      config.currentTrial++;
    }
  }
  
  
  function revealCard(index, card) {
    const cardElement = document.querySelectorAll('.card')[index];
    cardElement.style.backgroundColor = card.color;
    cardElement.textContent = card.shape;
    setTimeout(() => {
      cardElement.style.backgroundColor = 'rgb(33,33,33)';
      cardElement.textContent = '';
    }, 2000);
  
    // Record interaction logs
    config.results.push({
      trial: config.currentTrial + 1,
      cardIndex: index,
      cardShape: card.shape,
      cardColor: card.color,
      revealTime: Date.now() - config.startTime
    });
  
    config.currentTrial++;
  }
  
  let currentTestRound = 0;
  const totalTestRounds = 2;
  
  function showRecognitionTest() {
    document.getElementById('active-task').classList.add('hidden');
    document.getElementById('recognition-test').classList.remove('hidden');
    currentTestRound = 0;
    displayRecognitionRound();
  }
  function displayRecognitionRound() {
    const recognitionTest = document.getElementById('recognition-test');
    const recognitionContainer = document.getElementById('recognition-container');
    
    // Clear previous content
    recognitionContainer.innerHTML = '';
    
    // Remove previous instructions if they exist
    const oldInstructions = recognitionTest.querySelector('.recognition-instructions');
    if (oldInstructions) {
      oldInstructions.remove();
    }
  
    // Determine the focus attribute for this round
    // This is the only line we need to change
    const currentFocusAttribute = currentTestRound === 1 ? config.focusAttribute : (config.focusAttribute === 'shape' ? 'colour' : 'shape');
  
  
    // Create new instructions
    const instructions = document.createElement('div');
    instructions.className = 'recognition-instructions';
    instructions.innerHTML = `
      <h3>TRIAL ${currentTestRound + 1}</h3>
      <p>Select the arrangement that matches what you saw during the task. Focus on the <span class="dynamic-text"><strong>${currentFocusAttribute}</strong></span>.</p>
    `;
    
    // Insert instructions after the h2 but before the recognition-container
    recognitionTest.insertBefore(instructions, recognitionContainer);
  
    const options = generateRecognitionOptions();
    options.forEach((option, index) => {
      const optionElement = createRecognitionOption(option, index, currentFocusAttribute);
      recognitionContainer.appendChild(optionElement);
    });
  }

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';
  submitButton.addEventListener('click', submitRecognitionRound);
  testContainer.appendChild(submitButton);

function generateRecognitionOptions() {
  const correctArrangement = [...cardData]; // Assuming cardData holds the correct arrangement
  const options = [correctArrangement];

  // Generate 5 incorrect arrangements
  for (let i = 0; i < 5; i++) {
    let incorrectArrangement;
    do {
      incorrectArrangement = shuffleArray([...cardData]);
    } while (arraysEqual(incorrectArrangement, correctArrangement));
    options.push(incorrectArrangement);
  }

  return shuffleArray(options);
}

function createRecognitionOption(arrangement, index, focusAttribute) {
    const optionContainer = document.createElement('div');
    optionContainer.className = 'recognition-option';
    optionContainer.dataset.index = index;
  
    const grid = document.createElement('div');
    grid.className = 'recognition-grid';
  
    arrangement.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.className = 'recognition-card';
  
      if (focusAttribute === 'shape') {
        // Testing for shape
        cardElement.style.backgroundColor = 'black';
        cardElement.innerHTML = createSVGShape(card.shape, 'white');
      } else {
        // Testing for color
        cardElement.style.backgroundColor = card.color;
      }
  
      grid.appendChild(cardElement);
    });
  
    optionContainer.appendChild(grid);
    
    optionContainer.addEventListener('click', () => {
      document.querySelectorAll('.recognition-option').forEach(option => {
        option.classList.remove('selected');
      });
      optionContainer.classList.add('selected');
    });
  
    return optionContainer;
  }

  function submitRecognitionTest() {
    const selectedOption = document.querySelector('.recognition-option.selected');
    
    if (!selectedOption) {
      alert('Please select an option before submitting.');
      return;
    }
  
    const currentFocusAttribute = currentTestRound === 0 ? config.focusAttribute : (config.focusAttribute === 'shape' ? 'colour' : 'shape');
    const isCorrect = selectedOption.dataset.index === '0'; // Assuming the first option is always correct
  
    config.results.push({
      round: currentTestRound + 1,
      focusAttribute: currentFocusAttribute,
      correct: isCorrect
    });
  
    currentTestRound++;
  
    if (currentTestRound < totalTestRounds) {
      displayRecognitionRound();
    } else {
      showResults();
    }
  }

function arraysEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}
function showResults() {
    document.getElementById('recognition-test').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
  
    const resultsSummary = document.getElementById('results-summary');
  
    const originalArrangement = document.createElement('div');
    originalArrangement.innerHTML = `
      <div class="card-arrangement">
        ${cardData.map((card, index) => 
          `<div class="result-card" style="background-color: ${card.color};">
            ${createSVGShape(card.shape, 'white')}
           </div>`
        ).join('')}
      </div>
    `;
    resultsSummary.appendChild(originalArrangement);
  
    // Display results summary
    const focusedResult = config.results.find(result => result.focusAttribute === config.focusAttribute);
    const nonFocusedResult = config.results.find(result => result.focusAttribute !== config.focusAttribute);
  
    const summary = document.createElement('div');
    summary.innerHTML = `
      <h3>Results Summary</h3>
      <p>In the first trial, focusing on ${config.focusAttribute}, you ${focusedResult.correct ? 'correctly' : 'incorrectly'} identified the arrangement.</p>
      <p>In the second trial, focusing on ${config.focusAttribute === 'shape' ? 'colour' : 'shape'}, you ${nonFocusedResult.correct ? 'correctly' : 'incorrectly'} identified the arrangement.</p>
      <p>Overall, you answered ${focusedResult.correct + nonFocusedResult.correct} out of 2 questions correctly.</p>
    `;
    resultsSummary.appendChild(summary);
  
    // Add study debrief
    const debrief = document.createElement('div');
    debrief.innerHTML = `
      <div id="debrief"><h3>Study Debrief</h3>
      <p>This experiment was designed to test the effects of active versus passive learning on memory, specifically comparing focused and incidental memory for visual stimuli.</p>
      <p>In the first part of the experiment, you were asked to focus on the ${config.focusAttribute} of the cards. The second recognition test then assessed your incidental memory for the ${config.focusAttribute === 'shape' ? 'colour' : 'shape'} of the cards.</p>
      <p>Your performance on these tests helps us understand how different types of engagement with visual information affect memory formation and recall.</p></div>
    `;
    resultsSummary.appendChild(debrief);}
  
  function goToDebriefingForm() {
    window.location.href = "https://your-debriefing-form-url.com";
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }