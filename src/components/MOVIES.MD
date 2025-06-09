1. Limit maximum pages

Set a sensible upper limit on the pages you allow the user to navigate. For example:

const MAX_PAGE = 500; // or a smaller number

const [page, setPage] = useState(() => {
const p = Number(searchParams.get("page"));
return isNaN(p) || p < 1 ? 1 : Math.min(p, MAX_PAGE);
});

In your pagination buttons, disable next if page >= MAX_PAGE. 2. Use filters or sorting to narrow results

Instead of blindly paginating through all popular movies, add filters such as:

    Genre

    Year

    Rating

    Language

This reduces the result set and makes pagination more meaningful. 3. Implement search or curated lists

People rarely browse tens of thousands of pages. Use:

    Search queries to jump to specific movies.

    Curated lists or categories (e.g., "Top Rated", "Upcoming", "Trending").

    Show only a subset of pages (e.g., first 20 pages of popular).

4. Show only first N pages in UI

Even if API allows 50k pages, UI can restrict pagination controls to something like first 10-20 pages, with message "Showing first 10 pages". 5. Infinite scroll or "Load more"

Instead of classic pagination, you could use infinite scroll or a "Load more" button to load more movies gradually without overwhelming navigation.
Summary

Practical way: Cap the page max, combine with filters/search, and provide a better browsing experience than showing all 50,800 pages.
