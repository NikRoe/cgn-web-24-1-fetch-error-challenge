console.clear();

const userElement = document.querySelector('.user');
const errorElement = document.querySelector('.error');

/*
The getUser function is a standalone module responsible for fetching 
and processing data. It encapsulates the logic for making network requests 
and handling responses, keeping this concern separate from UI manipulation. 
This makes the function reusable and easier to maintain.

In getUser, errors related to network requests and data parsing are handled, 
keeping this concern within the data fetching module.
*/

async function getUser(url) {
  const response = await fetch(url);
  // Check if the response status is not OK (e.g., anything >= 400)
  if (!response.ok) {
    // Throw a network-related error if the fetch request failed
    throw new Error('Network error occurred');
  }
  try {
    // Attempt to parse the response as JSON
    const json = await response.json();
    // Return the user data from the parsed JSON
    return json.data;
  } catch (error) {
    // Throw an error if JSON parsing fails
    throw new Error('Error parsing JSON');
  }
}

/*
The code that manipulates the DOM (Document Object Model) 
is separate from the data fetching logic. 
The userElement and errorElement are specifically used 
for displaying data and errors on the webpage. 
This separation ensures that the logic for handling the display 
is not mixed with the logic for data retrieval and processing.

 In the event listener, errors are caught and displayed to the user, 
 separating the concern of user notification from data processing.
*/

// checks if an error occurs and updates UI accordingly
document.querySelectorAll('button[data-url]').forEach((button) =>
  button.addEventListener('click', async (event) => {
    // Clear any existing content in the user and error elements
    userElement.innerHTML = '';
    errorElement.innerHTML = '';
    try {
      const user = await getUser(event.target.dataset.url);
      userElement.innerHTML = `
      <h2>${user.first_name} ${user.last_name}</h2>
      <img alt="${user.first_name} ${user.last_name}" src="${user.avatar}"/>
      `;
    } catch (error) {
      // If an error occurs, display a default error message and the error details
      userElement.innerHTML = 'Could not find user, try again tomorrow';
      errorElement.innerHTML = error.message;
    }
  })
);
