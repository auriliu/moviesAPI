// Handle scroll event
const handleScroll = useCallback(() => {
if (
window.innerHeight + window.scrollY >=
document.documentElement.scrollHeight - 200 // 200px from bottom
) {
if (!loading && data && page < data.total_pages) {
setPage((prev) => prev + 1);
}
}
}, [loading, data, page]);

// Attach scroll listener
useEffect(() => {
window.addEventListener("scroll", handleScroll);
return () => window.removeEventListener("scroll", handleScroll);
}, [handleScroll]);

- how it all works?
- u gonna have to append new results.
