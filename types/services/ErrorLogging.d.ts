import { FrontendErrorType } from '@enums';
import { FrontendError } from '@types';
declare class ErrorLoggingService {
  private hasCritical;
  private controller;
  private errors;
  catch(
    type: FrontendErrorType,
    error:
      | {
          [key: string]: number | string | undefined;
        }
      | Error,
  ): Promise<void>;
  send(): Promise<void>;
  checkIsErrorInExceptionList(error: FrontendError): boolean;
  private abortController;
  private transformError;
  private shouldSendErrors;
  private getUserData;
  private getErrorPath;
  private generateId;
}
export declare const ErrorLogging: ErrorLoggingService;
export {};
