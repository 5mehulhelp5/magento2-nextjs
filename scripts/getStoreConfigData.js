// Import shared fetchQuery function
const { fetchQuery } = require('./lib/fetchQuery');

/**
 * GraphQL query to get store config data
 */
const GET_STORE_CONFIG_QUERY = `
  query getStoreConfigData {
    storeConfig {
      baseLinkUrl: base_link_url
      category_url_suffix
      code
      configurable_thumbnail_source
      cms_home_page
      defaultDescription: default_description
      defaultKeywords: default_keywords
      defaultTitle: default_title
      locale
      product_url_suffix
      root_category_uid
      secure_base_media_url
      store_code
      store_name
      timezone
      titlePrefix: title_prefix
      titleSuffix: title_suffix
      headIncludes: head_includes
      paymentServiceMode: payment_service_mode
    }
    availableStores {
      store_code
      id
      secure_base_media_url
      store_name
      default_display_currency_code
    }
  }
`;

/**
 * Get store config data
 * Returns an object with storeConfig and availableStores
 * Reuses fetchQuery from getPossibleTypes.js
 */
async function getStoreConfig() {
  try {
    const data = await fetchQuery(GET_STORE_CONFIG_QUERY);
    return {
      storeConfig: data.storeConfig,
      availableStores: data.availableStores || []
    };
  } catch (error) {
    console.warn('⚠ Could not fetch store config:', error.message);
    // Return default/empty config to prevent build failure
    return {
      storeConfig: {
        base_link_url: '',
        code: process.env.STORE_VIEW_CODE || 'default',
        store_name: 'Store',
        locale: 'en_US',
        secure_base_media_url: '',
        default_title: '',
        default_keywords: '',
        default_description: '',
        title_prefix: '',
        title_suffix: '',
        head_includes: '',
        payment_service_mode: 'test'
      },
      availableStores: []
    };
  }
}

module.exports = { getStoreConfig };

