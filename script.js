const form = document.querySelector("form");
const result = document.querySelector(".result");

// const inp = form.elements[0].value;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) => {
  try {
    result.innerHTML = "Feaching Data...";
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await res.json();
    //  console.log(data);

    let definitions = data[0].meanings[0].definitions[0];
    result.innerHTML = `
    <h2><strong>Word: </strong>${data[0].word}</h2>
    <p class="partofspeech">${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning: </strong>${
      definitions.definition === undefined
        ? "Not found"
        : definitions.definition
    }</p>
    <p><strong>Example: </strong>${
      definitions.example === undefined ? "Not found" : definitions.example
    }</p>
    <p><strong>Antonyms: </strong>
    `;

    //fetching antonyms
    if (definitions.antonyms.length === 0) {
      result.innerHTML += `<span>Not Found</span>`;
    } else {
      for (let i = 0; i < definitions.antonyms.length; i++) {
        result.innerHTML += `<li>${definitions.antonyms[i]}</li>`;
      }
    }

    //adding read more button
    result.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;
  } catch (error) {
    result.innerHTML = `<p>the word could not be found</p>`;
  }
};
