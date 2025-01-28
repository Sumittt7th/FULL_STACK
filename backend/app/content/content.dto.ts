import { type BaseSchema } from "../common/dto/base.dto";
import { ISEO } from "../seo/seo.dto";
import { IMedia } from "../media/media.dto";

export interface IContent extends BaseSchema{
    title: string;
    body: string;
    category?: string;
    tags?: string[];
    author: string;
    status: "draft" | "published";
    publishedAt?: Date;
    seo?: ISEO; 
    media?: IMedia[];
  }
  