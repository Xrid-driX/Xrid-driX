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

    const addButton = document.createElement('button');
    addButton.innerText = 'Add Count';
    addButton.className = 'bg-green-500 text-white py-2 px-4 rounded mr-2 mt-1 mb-2 transition duration-300 transform hover:bg-green-600 hover:scale-105 md:mr-3';
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
    startButton.className = 'bg-blue-500 text-white py-1 px-3 rounded mr-2 mb-1.5 transition duration-300 transform hover:bg-blue-600 hover:scale-105';
    startButton.onclick = startTimer;

    const pauseButton = document.createElement('button');
    pauseButton.innerText = 'Pause Timer';
    pauseButton.className = 'bg-yellow-500 text-white py-1 px-3 rounded mr-2 mb-1.5 transition duration-300 transform hover:bg-yellow-600 hover:scale-105';
    pauseButton.onclick = pauseTimer;

    const resetButton = document.createElement('button');
    resetButton.innerText = 'Reset Counter';
    resetButton.className = 'bg-indigo-500 text-white py-1 px-3 rounded mr-2 mb-1.5 transition duration-300 transform hover:bg-indigo-600 hover:scale-105';
    resetButton.onclick = resetCounter;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete Counter';
    deleteButton.className = 'bg-red-500 text-white py-1 px-1 rounded mb-1.5 transition duration-300 transform hover:bg-red-600 hover:scale-105';
    deleteButton.onclick = () => {
        counterContainer.remove();
    };

    counterContainer.appendChild(timerDisplay);
    counterContainer.appendChild(countDisplay);
    counterContainer.appendChild(addButton);
    counterContainer.appendChild(startButton);
    counterContainer.appendChild(pauseButton);
    counterContainer.appendChild(resetButton);
    counterContainer.appendChild(deleteButton);
    counterContainer.appendChild(taskList); // Append the task list to the counter

    document.getElementById('counters').appendChild(counterContainer);
}

document.getElementById('addCounter').onclick = createCounter;
