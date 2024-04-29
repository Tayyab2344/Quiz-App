const fetchCategories = async () => {
  try {
    const response = await fetch("https://opentdb.com/api_category.php");
    if (!response.ok) {
      throw {
        message: "Failed to fetch data from server of categories",
        status: response.status,
        statusText: response.statusText,
      };
    }
    const data = await response.json();
    return data.trivia_categories;
  } catch (error) {
    console.error(error);
  }
};

const populateCategories = async () => {
  const categories = await fetchCategories();
  const selectCategory = document.getElementById("category");
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    selectCategory.appendChild(option);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  populateCategories();
});

document.getElementById("start-button").addEventListener("click", function () {
  const category = document.getElementById("category").value;
  const difficulty = document.getElementById("difficulty").value;
  const type = document.getElementById("type").value;
  const amount = document.getElementById("amount").value;

  const quizAppUrl = `question.html?category=${category}&difficulty=${difficulty}&type=${type}&amount=${amount}`;
  window.location.href = quizAppUrl;
});
