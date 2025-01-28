import { type BaseSchema } from "../common/dto/base.dto";

export interface IFormSchema extends BaseSchema{
    title: string;
    description?: string;
    fields: Array<{
      name: string;
      type: string;
      label: string;
      placeholder?: string;
      options?: Array<string>;
      validations?: {
        required?: boolean;
        maxLength?: number;
        minLength?: number;
        regex?: string;
      };
    }>;
    active: boolean;
  }
  