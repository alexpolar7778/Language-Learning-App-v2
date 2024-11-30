$(document).ready(function () {
    const easyWords = [
        { word: "cat", translation: "кіт" },
        { word: "dog", translation: "собака" },
        { word: "apple", translation: "яблуко" },
        { word: "sun", translation: "сонце" },
        { word: "fish", translation: "риба" }
    ];

    const mediumWords = [
        { word: "family", translation: "сім'я" },
        { word: "friend", translation: "друг" },
        { word: "school", translation: "школа" },
        { word: "garden", translation: "сад" },
        { word: "country", translation: "країна" }
    ];

    const hardWords = [
        { word: "university", translation: "університет" },
        { word: "philosophy", translation: "філософія" },
        { word: "astronomy", translation: "астрономія" },
        { word: "psychology", translation: "психологія" },
        { word: "responsibility", translation: "відповідальність" }
    ];

    let selectedWords = [];
    let currentIndex = 0;
    let correctCount = 0;
    let incorrectCount = 0;

    $("input[name='difficulty']").on("change", function () {
        const difficulty = $(this).val();
        if (difficulty === "easy") selectedWords = [...easyWords];
        else if (difficulty === "medium") selectedWords = [...mediumWords];
        else if (difficulty === "hard") selectedWords = [...hardWords];
        
        selectedWords.sort(() => 0.5 - Math.random());
        resetGame();
    });
    
    selectedWords = [...easyWords];
    selectedWords.sort(() => 0.5 - Math.random());
    updateCard();

    function updateCard() {
        if (currentIndex < selectedWords.length) {
            $("#word").text(selectedWords[currentIndex].word);
            $("#translation").val("");
            $("#step").text(currentIndex + 1);
        } 
        else showModal();
    }

    $("#check").on("click", function () {
        const userInput = $("#translation").val().trim().toLowerCase();
        const correctTranslation = selectedWords[currentIndex].translation.toLowerCase();

        if (!userInput) {
            alert("Please enter a translation before proceeding!");
            return;
        }

        if (userInput === correctTranslation) {
            correctCount++;
            $("#correct").text(correctCount);
        } 
        else {
            incorrectCount++;
            $("#incorrect").text(incorrectCount);
        }

        currentIndex++;
        updateCard();
    });

    function showModal() {
        let level = "";
        if (correctCount <= 3) level = "Low";
        else if (correctCount >= 4 && correctCount <= 7) level = "Medium";
        else level = "High";

        $("#result").html(
            `<strong>Your score: <span class="correct">Correct: ${correctCount}</span> | <span class="incorrect">Incorrect: ${incorrectCount}</span> 
            <p>Your level: <span class="level">${level}</span></strong></p>`
        );
        $("#modal").fadeIn();
    }

    $("#restart").on("click", function () {
        resetGame();
        $("#modal").fadeOut();
    });

    function resetGame() {
        currentIndex = 0;
        correctCount = 0;
        incorrectCount = 0;
        $("#correct").text(correctCount);
        $("#incorrect").text(incorrectCount);
        $("#step").text(currentIndex);
        updateCard();
    }
});