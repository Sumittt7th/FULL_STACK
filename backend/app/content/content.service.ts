import ContentModel from "./content.schema";
import { IContent } from "./content.dto";

export const createContent = async (data: IContent) => {
  return await ContentModel.create(data);
};

export const getContentById = async (id: string) => {
  return await ContentModel.findById(id).populate("seo")
  .populate("media").lean();
};

export const updateContent = async (id: string, data: Partial<IContent>) => {
  return await ContentModel.findOneAndUpdate({ _id: id }, data, { new: true });
};

export const deleteContent = async (id: string) => {
  return await ContentModel.deleteOne({ _id: id });
};

export const getAllContent = async (filters: Partial<IContent>) => {
  return await ContentModel.find(filters).populate("seo")
  .populate("media").lean();
};
