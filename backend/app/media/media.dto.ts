import { type BaseSchema } from "../common/dto/base.dto";

export interface IMedia extends BaseSchema{
    fileName: string;
    fileUrl: string;
    fileType: string;
    cloudinaryId: string;
    createdBy: string;
  uploadedAt: Date;
  }
  