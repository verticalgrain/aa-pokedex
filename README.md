## AgencyAnalytics Frontend React Challenge!

## My Notes:

### Architecture:
- I've put the api logic in a service in the API directory
- Instead of making two calls to the api (one for the pokemon details and one to the species endpoint for the formatted name), I'm just formatting the pokemon name client side
- I've used React Context for state management. I chose this over a library like redux or mobx because it's the simplest solution and works perfectly for this use case. 
- I decided to keep the routing simple and route by pokemon ID instead of the more human readable pokemon name. Given a real world project I would opt for routing by name. I would also implement routing for searches, with a query var such as `?search=searchterm`
- Search functionality is simplistic - it just gets a list of all pokemon and filters them by name. If this were a more complex project, I would add some features such as server side filtering, using the species endpoint directly to search for name variations, searching by multiple attributes instead of just by name, implementing fuzzy search, or using GraphQL. It could also benefit from rate limiting and better error handling. 


### Pokemon List Page
- I've added loading skeleton cards
- For pagination I used a different icon for the previous and next buttons, because I thought it was more modern. 
- I added smooth scrolling to the top when using pagination


### Search:
- I've added filters to filter search results


### Detail View:
- I added background colors to the types to make them more visually interesting
- I decided to separate the height, weight and base experience into a section above the stats
- I decided to display the stats as a bar graph to make it more visually interesting
- I decided to display the abilities as pills  
