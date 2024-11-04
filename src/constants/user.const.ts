import { IUser } from '@/models/user.model'

const INDIVIDUAL = {
  LABEL: 'Individual',
  VALUE: 2 as IUser['type']
}

const DIRECTOR = {
  LABEL: 'Director',
  VALUE: 1 as IUser['designation']
}

const MANAGER = {
  LABEL: 'Manager',
  VALUE: 2 as IUser['designation']
}

const SUPERVISOR = {
  LABEL: 'Supervisor',
  VALUE: 3 as IUser['designation']
}

const ASSISTANT = {
  LABEL: 'Assistant',
  VALUE: 4 as IUser['designation']
}

const ADMIN = {
  LABEL: 'Admin',
  VALUE: 1 as IUser['type']
}

const CORPORATE_EMPLOYER = {
  LABEL: 'Corporate/Employer',
  VALUE: 3 as IUser['type']
}

const THIRD_PARTY_ADMINISTRATOR = {
  LABEL: '3rd Party Administrators',
  VALUE: 4 as IUser['type']
}

const GOVT_ORGANISATION = {
  LABEL: 'Govt Organisations/Institutions',
  VALUE: 5 as IUser['type']
}

const USER = {
  STATUS: {
    DELETED: 2,
    ACTIVE: 1,
    INACTIVE: 0
  },
  NUMERIC_STATUS: {
    2: 'DELETED',
    1: 'ACTIVE',
    0: 'INACTIVE'
  },
  MAX_PROFILE_PICTURE_SIZE: 1,
  VALID_PROFILE_PICTURE_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'],
  DEFAULT_PROFILE_PICTURE: '/images/icons/placeholders/profile-picture.svg',
  TYPES: {
    INDIVIDUAL: INDIVIDUAL.VALUE,
    ADMIN: ADMIN.VALUE,
    CORPORATE_EMPLOYER: CORPORATE_EMPLOYER.VALUE,
    THIRD_PARTY_ADMINISTRATOR: THIRD_PARTY_ADMINISTRATOR.VALUE,
    GOVT_ORGANISATION: GOVT_ORGANISATION.VALUE
  },
  NUMERIC_TYPES: {
    1: ADMIN.LABEL,
    2: INDIVIDUAL.LABEL,
    3: CORPORATE_EMPLOYER.LABEL,
    4: THIRD_PARTY_ADMINISTRATOR.LABEL,
    5: GOVT_ORGANISATION.LABEL
  },
  OBJECT_TYPES: {
    ADMIN,
    INDIVIDUAL,
    CORPORATE_EMPLOYER,
    THIRD_PARTY_ADMINISTRATOR,
    GOVT_ORGANISATION
  },
  DESIGNATIONS: {
    DIRECTOR: DIRECTOR.VALUE,
    MANAGER: MANAGER.VALUE,
    ASSISTANT: ASSISTANT.VALUE,
    SUPERVISOR: SUPERVISOR.VALUE
  },
  NUMERIC_DESIGNATION_TYPES: {
    1: DIRECTOR.LABEL,
    2: MANAGER.LABEL,
    3: SUPERVISOR.LABEL,
    4: ASSISTANT.LABEL
  },
  OBJECT_DESIGNATION_TYPES: {
    DIRECTOR,
    MANAGER,
    ASSISTANT,
    SUPERVISOR
  }
}

export { USER }
