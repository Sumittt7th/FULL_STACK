import { ISEO } from "./seo.dto";
import SEOModel from "./seo.schema";

/**
 * Creates or updates SEO data for a page.
 * 
 * If SEO data for the given canonical URL already exists, it updates the existing record. 
 * Otherwise, it creates new SEO data.
 * 
 * @function createOrUpdateSEO
 * @param {ISEO} data - The SEO data to be created or updated. It includes the canonical URL, title, description, keywords, and robots.
 * @returns {Promise<ISEO>} The created or updated SEO data.
 */
export const createOrUpdateSEO = async (data: ISEO): Promise<ISEO> => {
  let seoData = await SEOModel.findOne({ canonicalUrl: data.canonicalUrl });

  if (seoData) {
    // Update existing SEO data
    seoData.title = data.title;
    seoData.description = data.description;
    seoData.keywords = data.keywords;
    seoData.robots = data.robots;
    seoData.updatedAt = new Date();
    await seoData.save();
  } else {
    // Create new SEO data
    seoData = await SEOModel.create(data);
  }

  return seoData;
};

/**
 * Retrieves SEO data by canonical URL.
 * 
 * @function getSEOByUrl
 * @param {string} canonicalUrl - The canonical URL for which the SEO data is to be fetched.
 * @returns {Promise<ISEO | null>} The SEO data for the given URL or null if no SEO data is found.
 */
export const getSEOByUrl = async (canonicalUrl: string): Promise<ISEO | null> => {
  return await SEOModel.findOne({ canonicalUrl }).lean();
};

/**
 * Retrieves all SEO data.
 * 
 * @function getAllSeo
 * @returns {Promise<ISEO[]>} A list of all SEO data stored in the database.
 */
export const getAllSeo = async () => {
  return await SEOModel.find().lean();
};
