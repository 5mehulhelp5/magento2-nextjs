// Use built-in fetch (Node.js 18+) or node-fetch if available
let fetch;
let httpsAgent = null;

try {
  // Try to use node-fetch if available
  fetch = require('node-fetch');
  const https = require('https');
  httpsAgent = new https.Agent({ rejectUnauthorized: false });
} catch (e) {
  // Fall back to global fetch (Node.js 18+)
  fetch = globalThis.fetch || require('node-fetch');
}

/**
 * Generic function to fetch GraphQL queries
 * Reusable for any GraphQL query
 *
 * @param {string} query - GraphQL query string
 * @param {object} variables - Optional GraphQL variables
 * @returns {Promise<object>} GraphQL response data
 */
async function fetchQuery(query, variables = {}) {
  const graphqlUrl = process.env.GRAPHQL_URL || 'http://localhost/graphql';
  const targetURL = new URL(graphqlUrl);

  const headers = {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip',
    Accept: 'application/json',
    'User-Agent': 'nextjs-build',
    Host: targetURL.host
  };

  if (process.env.STORE_VIEW_CODE) {
    headers['store'] = process.env.STORE_VIEW_CODE;
  }

  try {
    const fetchOptions = {
      body: JSON.stringify({ query, variables }),
      headers: headers,
      method: 'POST'
    };

    // Add agent only if using node-fetch
    if (httpsAgent) {
      fetchOptions.agent = targetURL.protocol === 'https:' ? httpsAgent : null;
    }

    const response = await fetch(targetURL.toString(), fetchOptions);

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching GraphQL query:', error);
    throw error;
  }
}

module.exports = { fetchQuery };

