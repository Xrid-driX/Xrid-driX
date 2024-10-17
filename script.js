let counterId = 0;

function createCounter() {
    counterId++;
    const counterContainer = document.createElement('div');
    counterContainer.className = 'border border-gray-300 p-4 rounded bg-white shadow-lg flex flex-col relative transition-transform transform hover:scale-105 duration-300';

    let count = 0;
    let timerInterval;
    let timer = 0;
    let isRunning = false;

    const timerDisplay = document.createElement('div');
    timerDisplay.className = 'text-lg font-bold mb-2';
    timerDisplay.innerText = `Timer: 0s`;

    const countDisplay = document.createElement('div');
    countDisplay.className = 'text-lg mb-2';
    countDisplay.innerText = `Count: ${count}`;

    // Function to update text colors based on the theme
    const updateTextColor = () => {
        const isDarkMode = document.body.classList.contains('bg-gray-800');
        timerDisplay.className = isDarkMode ? 'text-lg font-bold mb-2 text-white' : 'text-lg font-bold mb-2';
        countDisplay.className = isDarkMode ? 'text-lg mb-2 text-white' : 'text-lg mb-2';
    };

    // Call updateTextColor initially
    updateTextColor();

    // Create a button container to center all buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex flex-col items-center'; // Center buttons

    const addButton = document.createElement('button');
    addButton.innerText = 'Add Count';
    addButton.className = 'bg-green-500 text-white py-2 px-4 w-6/12 text-center rounded mb-2 transition duration-300 transform hover:bg-green-600 hover:scale-105';
    addButton.onclick = () => {
        count++;
        countDisplay.innerText = `Count: ${count}`;
        if (isRunning) {
            const taskItem = document.createElement('li');
            taskItem.innerText = `Folded towel count: "${count}" finished in ${timer}s`;
            taskItem.className = 'task transition duration-300 hover:text-green-500'; // Adding hover effect for tasks
            taskList.appendChild(taskItem);
        }
        clearInterval(timerInterval);
        isRunning = false;
    };

    const taskList = document.createElement('ul');
    taskList.className = 'mt-2 list-disc list-inside';

    const startTimer = () => {
        if (!isRunning) {
            isRunning = true;
            clearInterval(timerInterval);
            timer = 0;
            timerInterval = setInterval(() => {
                timer++;
                timerDisplay.innerText = `Timer: ${timer}s`;
            }, 1000);
        }
    };

    const pauseTimer = () => {
        clearInterval(timerInterval);
        isRunning = false;
    };

    const resetCounter = () => {
        count = 0;
        timer = 0;
        countDisplay.innerText = `Count: ${count}`;
        timerDisplay.innerText = `Timer: 0s`;
        clearInterval(timerInterval);
        isRunning = false;
        taskList.innerHTML = ''; // Clear the task list
    };

    const startButton = document.createElement('button');
    startButton.innerText = 'Start Timer';
    startButton.className = 'bg-blue-500 text-white py-1 px-3 w-6/12 text-center rounded mb-1 transition duration-300 transform hover:bg-blue-600 hover:scale-105';
    startButton.onclick = startTimer;

    const pauseButton = document.createElement('button');
    pauseButton.innerText = 'Pause Timer';
    pauseButton.className = 'bg-yellow-500 text-white py-1 px-3 w-6/12 text-center rounded mb-1 transition duration-300 transform hover:bg-yellow-600 hover:scale-105';
    pauseButton.onclick = pauseTimer;

    const resetButton = document.createElement('button');
    resetButton.innerText = 'Reset Counter';
    resetButton.className = 'bg-indigo-500 text-white py-1 px-3 w-6/12 text-center rounded mb-1 transition duration-300 transform hover:bg-indigo-600 hover:scale-105';
    resetButton.onclick = resetCounter;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete Counter';
    deleteButton.className = 'bg-red-500 text-white py-1 px-3 w-6/12 text-center rounded mb-1 transition duration-300 transform hover:bg-red-600 hover:scale-105';
    deleteButton.onclick = () => {
        counterContainer.remove();
    };

    // Append all buttons to the button container
    buttonContainer.appendChild(addButton);
    buttonContainer.appendChild(startButton);
    buttonContainer.appendChild(pauseButton);
    buttonContainer.appendChild(resetButton);
    buttonContainer.appendChild(deleteButton);

    // Append elements to the counter container
    counterContainer.appendChild(timerDisplay);
    counterContainer.appendChild(countDisplay);
    counterContainer.appendChild(buttonContainer); // Add button container here
    counterContainer.appendChild(taskList); // Append the task list to the counter

    document.getElementById('counters').appendChild(counterContainer);
}

document.getElementById('addCounter').onclick = createCounter;

// Dark mode functionality
const body = document.body;

const setTheme = (theme) => {
    if (theme === 'dark') {
        body.classList.add('bg-gray-800', 'text-white');
        body.classList.remove('bg-gray-100', 'text-black');
        document.querySelectorAll('.text-black').forEach(el => el.classList.remove('text-black'));
        document.querySelectorAll('.text-white').forEach(el => el.classList.add('text-white'));
    } else {
        body.classList.remove('bg-gray-800', 'text-white');
        body.classList.add('bg-gray-100', 'text-black');
        document.querySelectorAll('.text-white').forEach(el => el.classList.remove('text-white'));
        document.querySelectorAll('.text-black').forEach(el => el.classList.add('text-black'));
    }

    // Update existing counters to reflect theme changes
    document.querySelectorAll('.border').forEach(counter => {
        counter.className = theme === 'dark' ? 'border border-gray-700 p-4 rounded bg-gray-900 shadow-lg flex flex-col relative transition-transform transform hover:scale-105 duration-300' : 'border border-gray-300 p-4 rounded bg-white shadow-lg flex flex-col relative transition-transform transform hover:scale-105 duration-300';
        updateTextColor(); // Update text colors
    });
};

// Initialize theme based on local storage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
}

// Toggle Theme Button
document.getElementById('toggleTheme').onclick = () => {
    const currentTheme = body.classList.contains('bg-gray-800') ? 'light' : 'dark';
    setTheme(currentTheme);
    localStorage.setItem('theme', currentTheme); // Save the theme to local storage
};
