const NEW_QUOTE_API_URL = "http://api.quotable.io/random"
const quoteGeneratorElement = document.getElementById('quoteGenerator')
const userAttemptElement = document.getElementById('userAttempt')
const stopwatchElement = document.getElementById('stopwatch')

userAttemptElement.addEventListener('input', () => {
    const arrayQuote = quoteGeneratorElement.querySelectorAll('splice')
    const arrayChar = userAttemptElement.value.split('')

    let done = true
    arrayQuote.forEach((characterSplice, index) => {
        const char = arrayChar[index]
        if (char == null) {
            characterSplice.classList.remove('correct')
            characterSplice.classList.remove('incorrect')
            done = false
        } else if (char == characterSplice.innerText) {
            characterSplice.classList.add('correct')
            characterSplice.classList.remove('incorrect')
        } else {
            characterSplice.classList.remove('correct')
            characterSplice.classList.add('incorrect')
            done = false
        }
    })

    if (done) renderRandomQuote()
})

function generateNewQuote() {
    return fetch(NEW_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderRandomQuote() {
    const quote = await generateNewQuote()
    quoteGeneratorElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSplice = document.createElement('splice')
        characterSplice.innerText = character
        quoteGeneratorElement.appendChild(characterSplice)
    })
    userAttemptElement.value = null
    startStopwatch()
}

let start 
function startStopwatch() {
    stopwatchElement.innerText = 0
    start = new Date()
    setInterval(() => {
        stopwatch.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date() - start) / 1000)
}

renderRandomQuote()