## AgencyAnalytics Frontend React Challenge!

Thanks Agency Analytics for the fun challenge! I've enjoyed putting this Pokedex together and my eight year old daughter has been having fun using it on her tablet!

## Running app:

### With NPM:
- `npm install`
- `npm run dev`
- `localhost:5173`

### With Docker:
- `docker-compose up`
- `localhost:3000`

## Some Notes:
Below are some notes on my approach, places I've decided to deviate from the mockups, and extra features I've added.

### Architecture:
- I've located the api logic in a service in the API directory.
- State management: I've used React Context for managing the state of the requested Pokemon. I chose this over a library like redux or mobx because it's the simplest solution and works perfectly for this use case. I've used a second context for managing the state of the Favourites Sidebar. 
- I decided to keep the routing simple and route by pokemon ID instead of the more human readable pokemon name. Given a real world project I would opt for routing by name. I would also implement routes for searches, using a query var such as `?search=searchterm`
- Search functionality is simplistic - it just gets a list of all pokemon and filters them by name. If this were a more complex project, I would add some features such as server side filtering, using the species endpoint directly to search for name variations, searching by multiple attributes instead of just by name, implementing fuzzy search, or using GraphQL. It could also benefit from rate limiting and better error handling. 

### Pokemon List Page
- I've added skeleton cards for a loading state of the List page.
- For pagination I used a different icon for the previous and next buttons than shown in the mockups, because I thought it was more modern. 
- I've added smooth scrolling back to the top of the page when using pagination.
- The initial Pokemon data returned by the api includes the Pokemon name lowercase, and hyphenated. Instead of making a second call to the species endpoint of the api for the formatted name, I'm just formatting the pokemon name client side using a simple utility function called formatPokemonName().

### Search Results:
- I've added simple filters to search results, to allow the user to sort and filter results. 
- For a production project I would also add these to the homepage list.

### Detail View:
- I added background colors to the types to make them more visually interesting.
- I decided to separate the height, weight and base experience into a section above the stats.
- I decided to display the stats as a bar graph to make it more visually interesting.
- I decided to display the abilities as pills instead of as a text list, again to be more visually interesting.

### Third Page: Favourite Pokemon Sidebar
- Instead of a third page, I've added a sidebar for favourite pokemon.
- Pokemon can be added to the sidebar by drag and drop (this could also have been done with a simple favourite button on the Pokemon, but I wanted to showcase a more complex UI functionality!).
- If a Pokemon as already been favourited, a heart is shown and it can't be dragged.
- Favourite Pokemon persist between sessions due to being stored in localstorage.

### Optimizations I would make on a production project:
- Accessibility: While I've covered basic accessibility and ensured the pokedex is functional using a screen reader, there are always more improvements to be made when doing a deeper accessibility assessment.
- Caching of queried data to prevent re-querying Pokemon that have already been viewed.
- Fetching data with fewer requests: The list view makes 17 requests per page - 1 request for basic details of each pokemon on the page and then another request for details of each of the 16 pokemon on the page. I would prefer to do this with fewer requests, but the Pokemon API doesn't provide an endpoint for fetching multiple Pokemon details in a single request. For a production project I would use one of the unofficial GraphQl wrappers for the Pokemon API such as this one: https://github.com/mazipan/graphql-pokeapi 