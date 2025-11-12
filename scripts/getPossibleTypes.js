// Import shared fetchQuery function
const { fetchQuery } = require('./lib/fetchQuery');

/**
 * GraphQL query to get schema types
 */
const GET_SCHEMA_TYPES_QUERY = `
  query IntrospectionQuery {
    __schema {
      types {
        kind
        name
        possibleTypes {
          name
        }
      }
    }
  }
`;

/**
 * Fetch GraphQL schema types from the endpoint
 */
async function fetchSchemaTypes() {
  return fetchQuery(GET_SCHEMA_TYPES_QUERY);
}

/**
 * Generate possible types from schema
 * Maps interface/union types to their possible implementations
 * 
 * @returns {Object} Object mapping supertype names to arrays of subtype names
 */
async function getPossibleTypes() {
  try {
    const data = await fetchSchemaTypes();

    const possibleTypes = {};

    data.__schema.types.forEach(supertype => {
      if (supertype.possibleTypes && supertype.possibleTypes.length > 0) {
        possibleTypes[supertype.name] = supertype.possibleTypes.map(
          subtype => subtype.name
        );
      }
    });

    return possibleTypes;
  } catch (error) {
    console.warn('Failed to fetch possibleTypes from GraphQL schema:', error.message);
    console.warn('Using empty possibleTypes object. Apollo Client will work but may have cache issues with unions/interfaces.');
    // Return empty object as fallback
    return {};
  }
}

module.exports = { getPossibleTypes };

