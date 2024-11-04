import { existsSync, mkdirSync, writeFileSync, unlinkSync, readFileSync } from 'fs'
import path from 'path'
import { ErrorHandlingService } from './ErrorHandling.service'
import { utils } from '@/utils/utils'
import { FILE_MANAGER } from '@/constants/fileManager.const'

class FileManagerService {
  private rootPath = `${process.cwd()}/public`
  private basePath = `${process.cwd()}/public/images`

  private getFolderPath(type: keyof typeof FILE_MANAGER.FOLDERS): string {
    const folder = FILE_MANAGER.FOLDERS[type]
    if (!folder) {
      throw ErrorHandlingService.badRequest({
        message: `Unknown type: ${type}`
      })
    }
    return path.resolve(this.basePath, folder)
  }

  private ensureDirectoryExists(dir: string): void {
    if (!existsSync(dir)) {
      try {
        mkdirSync(dir, { recursive: true })
      } catch (error) {
        throw ErrorHandlingService.badRequest({
          message: `Failed to create directory: ${dir}`,
          data: { error: utils.error.getMessage(error) }
        })
      }
    }
  }

  private getFilePath(type: keyof typeof FILE_MANAGER.FOLDERS, fileName: string): string {
    const folderPath = this.getFolderPath(type)
    return path.resolve(folderPath, fileName)
  }

  public writeFile(
    type: keyof typeof FILE_MANAGER.FOLDERS,
    fileName: string,
    data: string | Buffer | Uint8Array
  ): { status: boolean; message: string | null; data: { filePath: string } } {
    try {
      const filePath = this.getFilePath(type, fileName)
      const dir = path.dirname(filePath)
      this.ensureDirectoryExists(dir)
      writeFileSync(filePath, data)
      const filePathRelative = filePath.replace(this.rootPath, '')
      return utils.generateRes({
        status: true,
        message: 'File written successfully',
        data: { filePath: filePathRelative }
      })
    } catch (error) {
      throw ErrorHandlingService.badRequest({
        message: `Failed to write file: ${fileName}`,
        data: { error: utils.error.getMessage(error) }
      })
    }
  }

  public readFile(
    type: keyof typeof FILE_MANAGER.FOLDERS,
    fileName: string
  ): { status: boolean; message: string | null; data: { data: Buffer; filePath: string } } {
    try {
      const filePath = this.getFilePath(type, fileName)
      if (!existsSync(filePath)) {
        throw ErrorHandlingService.notFound({
          message: `File not found: ${fileName}`
        })
      }
      const data = readFileSync(filePath)
      const filePathRelative = filePath.replace(this.rootPath, '')
      return utils.generateRes({
        status: true,
        message: 'File read successfully',
        data: { data, filePath: filePathRelative }
      })
    } catch (error) {
      throw ErrorHandlingService.notFound({
        message: `Failed to read file: ${fileName}`,
        data: { error: utils.error.getMessage(error) }
      })
    }
  }

  public readFileAsString(
    type: keyof typeof FILE_MANAGER.FOLDERS,
    fileName: string
  ): { status: boolean; message: string | null; data: { data: string; filePath: string } } {
    try {
      const {
        data: { data, filePath }
      } = this.readFile(type, fileName)
      return utils.generateRes({
        status: true,
        message: 'File read as string successfully',
        data: { data: data.toString('utf8'), filePath }
      })
    } catch (error) {
      throw ErrorHandlingService.notFound({
        message: `Failed to read file as string: ${fileName}`,
        data: { error: utils.error.getMessage(error) }
      })
    }
  }

  public deleteFile(
    type: keyof typeof FILE_MANAGER.FOLDERS,
    fileName: string
  ): { status: boolean; message: string | null; data: { filePath: string } } {
    try {
      // Extract just the file name if a full path is provided
      fileName = path.basename(fileName)

      const filePath = this.getFilePath(type, fileName)

      if (existsSync(filePath)) {
        unlinkSync(filePath)
        const filePathRelative = filePath.replace(this.rootPath, '')
        return utils.generateRes({
          status: true,
          message: 'File deleted successfully',
          data: { filePath: filePathRelative }
        })
      } else {
        throw ErrorHandlingService.notFound({
          message: `File not found: ${fileName}`
        })
      }
    } catch (error) {
      throw ErrorHandlingService.notFound({
        message: `Failed to delete file: ${fileName}`,
        data: { error: utils.error.getMessage(error) }
      })
    }
  }
}

export { FileManagerService }
