import { useState } from "react";

function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState("");//stores what the user types in the input field. It is initially set to an empty string, 

  function handleSubmit(event) {//handles the form submission event when the user clicks the search button or presses Enter.
    event.preventDefault();//so the page doesn't reload when the form is submitted, which is the default behavior of a form submission in HTML. This allows me to handle the search logic without losing the current state of the application.

    if (!city.trim()) {
      return;//if there is no city name entered, the function returns early and does not proceed with the search. This prevents unnecessary API calls and ensures that the user provides a valid city name before initiating a search.
    }

    onSearch(city.trim());
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a city name..."
        value={city}
        onChange={(event) =>
          setCity(event.target.value)
        }
        disabled={loading}//waiting for the API response, the input field is disabled to prevent the user from making additional searches until the current search is complete. This helps avoid multiple simultaneous requests and ensures that the app remains responsive during the loading process.
      />

      <button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;