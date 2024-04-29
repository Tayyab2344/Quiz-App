    document.getElementById('start-button').addEventListener('click', function() {
      // Retrieve the form values
      const category = document.getElementById('category').value;
      const difficulty = document.getElementById('difficulty').value;
      const type = document.getElementById('type').value;
      const amount = document.getElementById('amount').value;

      // Construct the URL for the quiz app
      const quizAppUrl = `question.html?category=${category}&difficulty=${difficulty}&type=${type}&amount=${amount}`;

      // Redirect the user to the quiz app
      window.location.href = quizAppUrl;
    });