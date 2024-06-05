document.addEventListener('DOMContentLoaded', function() {
    const countryInput = document.getElementById('search-country');
    const destinationInput = document.getElementById('search-destination');
    const countrySuggestionsContainer = document.getElementById('country-suggestions-container');
    const destinationSuggestionsContainer = document.getElementById('destination-suggestions-container');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');

    // Event listener for form submission
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get input values
        const destination = destinationInput.value;
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);

        // Example vacation data
        const vacations = [
            { country: 'France', destination: 'Paris', startDate: new Date('2024-06-01'), endDate: new Date('2024-06-10'), price: '700€' },
            { country: 'UAE', destination: 'Dubai', startDate: new Date('2024-07-15'), endDate: new Date('2024-07-25'), price: '650€' },
            { country: 'UAE', destination: 'Dubai', startDate: new Date('2024-07-15'), endDate: new Date('2024-07-25'), price: '1650€' },
            { country: 'Japan', destination: 'Tokyo', startDate: new Date('2024-08-20'), endDate: new Date('2024-09-01'), price: '1200€' },
        ];

        // Filter vacations based on user input
        const results = vacations.filter(vacation => 
            vacation.destination.toLowerCase().includes(destination.toLowerCase()) &&
            vacation.startDate >= startDate &&
            vacation.endDate <= endDate
        );

        // Display results
        displayResults(results);
    });

    // Function to display search results
    function displayResults(results) {
        const resultsSection = document.getElementById('results');
        resultsSection.innerHTML = '';

        if (results.length === 0) {
            resultsSection.innerHTML = '<p>No vacations found for the specified criteria.</p>';
            return;
        }

        const ul = document.createElement('ul');
        results.forEach(result => {
            const li = document.createElement('li');
            li.textContent = `${result.destination}: ${result.startDate.toDateString()} to ${result.endDate.toDateString()} Price: ${result.price}`;
            ul.appendChild(li);
        });

        resultsSection.appendChild(ul);
    }

    // Sample data for destinations and countries
    const destinations = ["Dubai", "Paris", "Tokyo"];
    const countries = ["UAE", "France", "Japan"];

    // Function to filter and display suggestions
    function filterSuggestions(input, suggestions, suggestionsContainer) {
        const query = input.value.toLowerCase();
        suggestionsContainer.innerHTML = '';

        if (query) {
            const filteredSuggestions = suggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(query)
            );

            filteredSuggestions.forEach(suggestion => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.textContent = suggestion;

                // Add event listener for debugging
                suggestionItem.addEventListener('click', () => {
                    console.log('Suggestion clicked:', suggestion);
                    input.value = suggestion;
                    suggestionsContainer.innerHTML = '';
                    suggestionsContainer.style.display = 'none';
                });

                suggestionsContainer.appendChild(suggestionItem);
            });

            suggestionsContainer.style.display = filteredSuggestions.length > 0 ? 'block' : 'none';
        } else {
            suggestionsContainer.style.display = 'none';
        }
    }

    // Functions to filter and display destination and country suggestions
    /*
    function filterDestinations() {
        filterSuggestions('search-destination', destinations, 'destination-suggestions-container', 'destination-suggestion-item');
    }

    function filterCountries() {
        filterSuggestions('search-country', countries, 'country-suggestions-container', 'country-suggestion-item');
    }*/

    // Ensure filterCountries and filterDestinations are defined in the global scope
    /*window.filterCountries = filterCountries;
    window.filterDestinations = filterDestinations;*/

    // Attach input event listeners for dynamic suggestions
    countryInput.addEventListener('input', () => filterSuggestions(countryInput, countries, countrySuggestionsContainer));
    destinationInput.addEventListener('input', () => filterSuggestions(destinationInput, destinations, destinationSuggestionsContainer));
    /*document.getElementById('search-country').addEventListener('input', filterCountries);
    document.getElementById('search-destination').addEventListener('input', filterDestinations);*/

    // Hide suggestions when input loses focus after a slight delay
    countryInput.addEventListener('blur', () => setTimeout(() => countrySuggestionsContainer.style.display = 'none', 100));
    destinationInput.addEventListener('blur', () => setTimeout(() => destinationSuggestionsContainer.style.display = 'none', 100));
    /*document.getElementById('search-country').addEventListener('blur', function() {
        setTimeout(() => document.getElementById('country-suggestions-container').style.display = 'none', 100);
    });

    document.getElementById('search-destination').addEventListener('blur', function() {
        setTimeout(() => document.getElementById('destination-suggestions-container').style.display = 'none', 100);
    });*/

    // Initialize datepickers
    function validateDates() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);

        if (startDate >= endDate) {
            alert("Start date must be before end date.");
        }
    }

    startDateInput.addEventListener('change', validateDates);
    endDateInput.addEventListener('change', validateDates);

    $(function() {
        $("#start-date").datepicker({
            dateFormat: "yy-mm-dd",
            onSelect: function() {
                validateDates();
            }
        });
    });

    $(function() {
        $("#end-date").datepicker({
            dateFormat: "yy-mm-dd",
            onSelect: function() {
                validateDates();
            }
        });
    });
});
