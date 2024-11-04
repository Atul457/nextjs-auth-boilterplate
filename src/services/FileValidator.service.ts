import { file } from '@/utils/file'
import { generateRes, IGenerateResReturn } from '@/utils/generateRes'
import * as Yup from 'yup'

interface ValidationOptions {
  multiple?: boolean
  maxFileSize?: number // Max file size in bytes
  validFileTypes?: string[] | string // Array of valid file types or a single string pattern
}

class FileValidatorService {
  static validateFile(options: ValidationOptions = { multiple: false }): Yup.MixedSchema {
    const maxFileSize = file.convertValue(options.maxFileSize ?? 0, 'B', 'MB')
    return Yup.mixed()
      .test('isSingleFile', 'Only a single file is allowed.', function (value: any) {
        return (
          options.multiple ||
          !Array.isArray(value) ||
          this.createError({
            message: 'Only a single file is allowed'
          })
        )
      })
      .test('isArrayRequired', 'An array of files is required', function (value: any) {
        return (
          options.multiple ||
          !Array.isArray(value) ||
          this.createError({
            message: 'An array of files is required'
          })
        )
      })
      .test('fileType', `File must be of a valid type`, function (value: any) {
        const fileTypeCheck = (file: any) => {
          if (options.validFileTypes) {
            if (Array.isArray(options.validFileTypes)) {
              return file && options.validFileTypes.includes(file.type)
            } else {
              return file && file.type.match(options.validFileTypes)
            }
          }
          return true
        }

        const validFileTypesStr = Array.isArray(options.validFileTypes)
          ? options.validFileTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')
          : options.validFileTypes

        if (options.multiple) {
          if (Array.isArray(value)) {
            return (
              value.every(fileTypeCheck) ||
              this.createError({
                message: `Invalid file type. Please upload a ${validFileTypesStr}.`
              })
            )
          }
          return this.createError({
            message: 'An array of files is required'
          })
        } else {
          return Array.isArray(value)
            ? this.createError({ message: 'Only a single file is allowed' })
            : fileTypeCheck(value) ||
                this.createError({
                  message: `Invalid file type. Please upload a ${validFileTypesStr}.`
                })
        }
      })
      .test('fileSize', `File too large. Maximum size is ${maxFileSize}MB`, function (value: any) {
        const fileSizeCheck = (file: any) => file && file.size <= (options.maxFileSize || Infinity)

        if (options.multiple) {
          if (Array.isArray(value)) {
            return (
              value.every(fileSizeCheck) ||
              this.createError({
                message: `All files must be smaller than ${maxFileSize}MB`
              })
            )
          }
          return this.createError({
            message: 'An array of files is required'
          })
        } else {
          return Array.isArray(value)
            ? this.createError({ message: 'Only a single file is allowed' })
            : fileSizeCheck(value) ||
                this.createError({
                  message: `File too large. Maximum size is ${maxFileSize}MB`
                })
        }
      })
      .required('File is required')
  }

  static async validateFileData(
    body: any,
    options: ValidationOptions = { multiple: false, maxFileSize: Infinity }
  ): Promise<IGenerateResReturn> {
    const fileSchema = this.validateFile(options)

    try {
      await fileSchema.validate(body.file)
      return generateRes({ status: true })
    } catch (err) {
      return generateRes({
        status: false,
        message: (err as Yup.ValidationError).message
      })
    }
  }
}

export default FileValidatorService
