import { ErrorHandlingService } from './ErrorHandling.service'
import UserSessionService from './server/UserSession.service'
import sUserService from './server/User.service'
import { FileManagerService } from './FileManager.service'
import FileValidatorService from './FileValidator.service'
import FileService from './server/File.service'
import MailService from './Mail.service'
import { UserService } from './client/UserService'

export const services = {
  FileValidatorService,
  ErrorHandlingService,
  FileManagerService,
  MailService,
  server: {
    FileService,
    UserService: sUserService,
    UserSessionService
  },
  client: {
    UserService
  }
}
