    document.getElementById('start-button').addEventListener('click', function() {
      const category = document.getElementById('category').value;
      const difficulty = document.getElementById('difficulty').value;
      const type = document.getElementById('type').value;
      const amount = document.getElementById('amount').value;

      const quizAppUrl = `question.html?category=${category}&difficulty=${difficulty}&type=${type}&amount=${amount}`;
      window.location.href = quizAppUrl;
    });