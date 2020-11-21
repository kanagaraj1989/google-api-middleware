import {checkSchema} from 'express-validator/check'
import {validateAuthBody} from "../../OAuth/Request/AuthRequestSchema";

const validateQuery = checkSchema({
  page: {
    in: ['query'],
    errorMessage: 'page is missing',
  },
  pageSize: {
    in: ['query'],
    errorMessage: 'pageSize is missing',
  },
})

export const peopleListSchema = [
  ...validateQuery,
  ...validateAuthBody,
]
