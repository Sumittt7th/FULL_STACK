import FormModel from "./form.schema";
import { IFormSchema } from "./form.dto";

export const createFormSchema = async (data: IFormSchema) => {
  return await FormModel.create(data);
};

export const getFormSchemaById = async (id: string) => {
  const result = await FormModel.findById(id).lean();
  console.log(result);
  return result;
};

export const updateFormSchema = async (id: string, data: Partial<IFormSchema>) => {
  return await FormModel.findOneAndUpdate({ _id: id }, data, { new: true });
};

export const deleteFormSchema = async (id: string) => {
  return await FormModel.deleteOne({ _id: id });
};

export const getAllFormSchemas = async () => {
  return await FormModel.find({ active: true }).lean();
};
