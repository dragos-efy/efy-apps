// Feed Controls
$add('div', {id: 'feed-controls'}, [
    ['input', {type: 'text', id: 'feed-url', placeholder: 'RSS Feed URL'}],
    ['input', {type: 'text', id: 'feed-name', placeholder: 'Feed Name'}],
    ['button', {onclick: 'addFeed()'}, 'Add Feed'],
    ['select', {id: 'posts-per-page'}, [
        ['option', {value: '20'}, '20 Posts'],
        ['option', {value: '50'}, '50 Posts'],
        ['option', {value: '100'}, '100 Posts']
    ]],
    ['div', {id: 'feed-list'}]
]);
$add('div', {id: 'posts'});
$add('div', {id: 'pagination'}, [
    ['button', {onclick: 'changePage(-1)'}, 'Previous'],
    ['span', {id: 'current-page'}, 'Page 1'],
    ['button', {onclick: 'changePage(1)'}, 'Next']
]);

        let feeds = [];
        let currentPage = 1;
        let allPosts = [];
        let selectedFeeds = new Set();

        function addFeed() {
            const urlInput = $('#feed-url');
            const nameInput = $('#feed-name');
            const url = urlInput.value.trim();
            const name = nameInput.value.trim() || new URL(url).hostname;

            if (!url) return;

            // Check for duplicate feeds
            if (feeds.some(feed => feed.url === url)) {
                alert('This feed is already added');
                return;
            }

            const feed = { url, name };
            feeds.push(feed);
            renderFeedList();
            fetchFeed(feed);

            // Clear inputs
            urlInput.value = '';
            nameInput.value = '';
        }

        function renderFeedList() {
            const feedList = $('#feed-list');
            feedList.innerHTML = '';

            feeds.forEach(feed => {
                const feedItem = document.createElement('div');
                feedItem.className = 'feed-item';
                feedItem.textContent = feed.name;
                feedItem.onclick = () => toggleFeedSelection(feed.url);

                if (selectedFeeds.has(feed.url)) {
                    feedItem.style.backgroundColor = '#a0d8ef';
                }

                feedList.appendChild(feedItem);
            });
        }

        function toggleFeedSelection(url) {
            if (selectedFeeds.has(url)) {
                selectedFeeds.delete(url);
            } else {
                selectedFeeds.add(url);
            }
            renderFeedList();
        }

        async function fetchFeed(feed) {
            try {
                // CORS Proxy for cross-origin requests
                const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(feed.url)}`;

                const response = await fetch(proxyUrl);
                const xmlText = await response.text();

                // Parse XML
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

                // Extract posts based on common RSS/Atom structures
                const items = xmlDoc.querySelectorAll('item, entry');

                const parsedPosts = Array.from(items).map(item => {
                    // Extract common RSS/Atom fields
                    const title = item.querySelector('title')?.textContent || 'No Title';
                    const link = item.querySelector('link')?.textContent ||
                                 item.querySelector('link')?.getAttribute('href') ||
                                 '#';
                    const description = item.querySelector('description, content')?.textContent || 'No description';
                    const pubDate = item.querySelector('pubDate, published')?.textContent || new Date().toISOString();

                    // Try to extract image
                    let image = null;
                    const imageElements = item.querySelectorAll('enclosure, image, media\\:thumbnail');
                    $wait(1, ()=>{ console.log(imageElements)});
                    if (imageElements.length > 0) {
                        image = imageElements[0].getAttribute('url') ||
                                imageElements[0].getAttribute('src');
                    }

                    return {
                        feedUrl: feed.url, feedName: feed.name,
                        title, link, description, pubDate, image
                    };
                });

                // Add new posts to allPosts
                allPosts = [...allPosts, ...parsedPosts];

                // Sort posts by date (most recent first)
                allPosts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

                // Render posts
                renderPosts();
            } catch (error) {
                console.error('Error fetching feed:', error);
                alert(`Failed to fetch feed: ${feed.name}`);
            }
        }

        function renderPosts() {
            const postsContainer = $('#posts');
            const postsPerPage = parseInt($('#posts-per-page').value);

            // Filter posts by selected feeds
            const filteredPosts = selectedFeeds.size > 0
                ? allPosts.filter(post => selectedFeeds.has(post.feedUrl))
                : allPosts;

            // Calculate pagination
            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            const displayPosts = filteredPosts.slice(startIndex, endIndex);

            // Clear previous posts
            postsContainer.innerHTML = '';

            // Render posts
            displayPosts.forEach(post => {
                const image = post.image ? ['img', {src: post.image, alt: post.title}] : null;

                $add('div', {class: 'post', efy_card: ''}, [
                    ['a', {href: post.link, target: '_blank'}, post.title],
                    ['small', `${post.feedName} | ${new Date(post.pubDate).toLocaleString()}`],
                    image,
                    ['p', truncateText(post.description, 200)],
                    // ['div', {class: 'post-actions'}, [
                        // ['button', {onclick: `showFullPost('${escapeHtml(JSON.stringify(post))}')`}, 'Full Post']
                    // ]]
                ], postsContainer);
            });

            // Update pagination display
            updatePaginationDisplay(filteredPosts.length, postsPerPage);
        }

        function updatePaginationDisplay(totalPosts, postsPerPage) {
            const currentPageElement = $('#current-page');
            const totalPages = Math.ceil(totalPosts / postsPerPage);

            currentPageElement.textContent = `Page ${currentPage} of ${totalPages}`;

            // Disable/enable pagination buttons
            const prevButton = document.querySelector('#pagination button:first-child');
            const nextButton = document.querySelector('#pagination button:last-child');

            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === totalPages;
        }

        function changePage(direction) {
            const postsPerPage = parseInt($('#posts-per-page').value);
            const filteredPosts = selectedFeeds.size > 0
                ? allPosts.filter(post => selectedFeeds.has(post.feedUrl))
                : allPosts;

            const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

            currentPage += direction;

            // Ensure page stays within bounds
            currentPage = Math.max(1, Math.min(currentPage, totalPages));

            renderPosts();
        }

        function showFullPost(postJson) {
            const post = JSON.parse(postJson.replace(/'/g, '"'));

            // Create a modal for full post details
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '1000';

            const modalContent = document.createElement('div');
            modalContent.style.backgroundColor = 'white';
            modalContent.style.padding = '20px';
            modalContent.style.borderRadius = '10px';
            modalContent.style.maxWidth = '600px';
            modalContent.style.maxHeight = '80%';
            modalContent.style.overflowY = 'auto';

            modalContent.innerHTML = `
                <h2>${post.title}</h2>
                <small>From: ${post.feedName} | ${new Date(post.pubDate).toLocaleString()}</small>
                ${post.image ? `<img src="${post.image}" alt="${post.title}" style="max-width:100%; height:auto;">` : ''}
                <p>${post.description}</p>
                <div style="display:flex; justify-content:space-between;">
                    <a href="${post.link}" target="_blank">Open Original Link</a>
                    <button onclick="this.closest('div').remove()">Close</button>
                </div>
            `;

            modal.appendChild(modalContent);

            // Close modal when clicking outside
            modal.onclick = (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            };

            document.body.appendChild(modal);
        }

        // Utility functions
        function truncateText(text, maxLength) {
            if (!text) return '';
            return text.length > maxLength
                ? text.substring(0, maxLength) + '...'
                : text;
        }

        function escapeHtml(unsafe) {
            return unsafe
                 .replace(/&/g, "&amp;")
                 .replace(/</g, "&lt;")
                 .replace(/>/g, "&gt;")
                 .replace(/"/g, "&quot;")
                 .replace(/'/g, "&#039;");
        }

        // Event listeners for dynamic updates
        $('#posts-per-page').addEventListener('change', () => {
            currentPage = 1;
            renderPosts();
        });

        // Local Storage Management
        function saveFeedsToLocalStorage() {
            localStorage.setItem('rssFeeds', JSON.stringify(feeds));
            localStorage.setItem('selectedFeeds', JSON.stringify([...selectedFeeds]));
        }

        function loadFeedsFromLocalStorage() {
            const storedFeeds = localStorage.getItem('rssFeeds');
            const storedSelectedFeeds = localStorage.getItem('selectedFeeds');

            if (storedFeeds) {
                feeds = JSON.parse(storedFeeds);
                renderFeedList();

                // Fetch feeds
                feeds.forEach(feed => fetchFeed(feed));
            }

            if (storedSelectedFeeds) {
                selectedFeeds = new Set(JSON.parse(storedSelectedFeeds));
                renderFeedList();
            }
        }

        // Export and Import Feeds
        function exportFeeds() {
            const feedData = {
                feeds: feeds,
                selectedFeeds: [...selectedFeeds]
            };

            const dataStr = "data:text/json;charset=utf-8," +
                encodeURIComponent(JSON.stringify(feedData, null, 2));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "rss_feeds_backup.json");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        }

        function importFeeds() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = e => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.readAsText(file, 'UTF-8');
                reader.onload = readerEvent => {
                    try {
                        const feedData = JSON.parse(readerEvent.target.result);

                        // Clear existing feeds
                        feeds = [];
                        allPosts = [];
                        selectedFeeds.clear();

                        // Import feeds
                        feedData.feeds.forEach(feed => {
                            feeds.push(feed);
                            fetchFeed(feed);
                        });

                        // Restore selected feeds
                        feedData.selectedFeeds.forEach(feedUrl => {
                            selectedFeeds.add(feedUrl);
                        });

                        renderFeedList();
                        renderPosts();
                    } catch (error) {
                        alert('Invalid feed file');
                    }
                };
            };
            input.click();
        }

        // Search functionality
        function searchPosts() {
            const searchInput = $('#search-input');
            const searchTerm = searchInput.value.toLowerCase();

            const filteredPosts = allPosts.filter(post =>
                post.title.toLowerCase().includes(searchTerm) ||
                post.description.toLowerCase().includes(searchTerm)
            );

            // Reset to first page of search results
            currentPage = 1;
            allPosts = filteredPosts;
            renderPosts();
        }

        // Add search input to HTML
        const searchContainer = document.createElement('div');
        searchContainer.innerHTML = `
            <input type="text" id="search-input" placeholder="Search posts...">
            <button onclick="searchPosts()">Search</button>
            <button onclick="loadFeedsFromLocalStorage()">Reset Search</button>
            <button onclick="exportFeeds()">Export Feeds</button>
            <button onclick="importFeeds()">Import Feeds</button>
        `;
        $('body').appendChild(searchContainer);

loadFeedsFromLocalStorage();