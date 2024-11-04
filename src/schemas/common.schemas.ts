import { utils } from '@/utils/utils'
import * as yup from 'yup'

const agree = yup
  .boolean()
  .oneOf([true], 'Please agree to terms & conditions')
  .required('Please agree to terms & conditions')

const firstNameSchema = yup.string().min(1, 'First name is a required field').required('First name is a required field')

const addressSchema = yup.string().optional().nullable()

const phoneNumberSchema_ = yup.string().nullable().optional()

const lastNameSchema = yup.string().min(1, 'Last name is a required field').required('Last name is a required field')

const phoneNumberSchema = yup
  .string()
  .required('Mobile number is a required field')
  .min(8, 'Please enter a valid mobile number')
  .max(15, 'Mobile number must be max 15 characters long')
  .matches(/^\d+$/, 'Please enter a valid mobile number')

const userTypeSchema = yup
  .number()
  .oneOf([1, 2, 3, 4], 'User type is a required field')
  .required('User type is a required field')

const designationTypeSchema = yup
  .number()
  .oneOf([1, 2, 3, 4], 'Designation is a required field')
  .required('Designation is a required field')

const emailSchema = yup
  .string()
  .min(1, 'Email is a required field')
  .email('Enter a valid email address')
  .required('Email is a required field')

const passwordSchema = yup
  .string()
  .required('Password is a required field')
  .min(5, 'Password must be at least 5 characters long')

const resetPassword = yup.object().shape({
  password: passwordSchema
})

const updatePassword = yup.object().shape({
  oldPassword: yup.string().required('Old password is a required field'),
  newPassword: yup
    .string()
    .required('New password is a required field')
    .min(5, 'New password must be at least 5 characters long')
})

const updatePasswordWithConfirm = updatePassword
  .clone()
  .shape({
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm Password is a required field')
  })
  .required()

const resetPasswordWithConfirm = resetPassword
  .clone()
  .shape({
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is a required field')
  })
  .required()

const login = yup.object().shape({
  email: emailSchema,
  password: yup.string().required('Password is a required field')
})

const registerStep1 = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  type: userTypeSchema
})

const updateProfileSchema = yup.object().shape({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  address: addressSchema,
  phoneNumber: phoneNumberSchema,
  phoneNumber_: phoneNumberSchema_,
  organizationName: yup.string().when('type', (type, schema) => {
    const object = utils.CONST.USER.TYPES
    return [object.GOVT_ORGANISATION, object.CORPORATE_EMPLOYER].includes(type?.[0])
      ? schema.required('Organization name is a required field')
      : schema
  })
})

const updateProfileSchemaWithType = updateProfileSchema.clone().shape({
  type: userTypeSchema
})

const registerStep2 = yup.object().shape({
  type: userTypeSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  organizationName: yup.string().when('type', (type, schema) => {
    const object = utils.CONST.USER.TYPES
    return [object.GOVT_ORGANISATION, object.CORPORATE_EMPLOYER].includes(type?.[0])
      ? schema.required('Organization name is a required field')
      : schema
  }),
  designation: yup.number().when('type', (type, schema) => {
    const object = utils.CONST.USER.TYPES
    return [object.GOVT_ORGANISATION, object.CORPORATE_EMPLOYER].includes(type?.[0]) ? designationTypeSchema : schema
  }),
  address: addressSchema,
  phoneNumber: phoneNumberSchema,
  phoneNumber_: phoneNumberSchema_
})

const registerStep2WithAgree = registerStep2.clone().shape({
  agree
})

const forgotPasswordSchema = yup.object().shape({
  email: emailSchema
})

const commonSchemas = {
  login,
  agree,
  resetPassword,
  registerStep1,
  registerStep2,
  updateProfileSchemaWithType,
  updateProfileSchema,
  forgotPasswordSchema,
  registerStep2WithAgree,
  resetPasswordWithConfirm,
  updatePasswordWithConfirm,
  updatePassword
}

export { commonSchemas }
