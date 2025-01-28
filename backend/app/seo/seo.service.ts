import { ISEO } from "./seo.dto";
import SEOModel from "./seo.schema";

// Create or update SEO data for a page
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

// Get SEO data by URL
export const getSEOByUrl = async (canonicalUrl: string): Promise<ISEO | null> => {
  return await SEOModel.findOne({ canonicalUrl }).lean();
};

export const getAllSeo = async () => {
  return await SEOModel.find().lean();
};
