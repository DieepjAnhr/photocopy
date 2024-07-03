import { EResponseStatus } from "@/common/enums/response-status";
import { IResponse } from "@/common/interfaces/response";

export const _createError = (error: Error) => {
    const errorMessage = error.message;
    const errorArray = errorMessage.split(' ~ ');
    const code = !isNaN(Number(errorArray[0])) ? Number(errorArray[0]) : 500;
    const message = errorArray[1] ? errorArray[1] : errorArray[0];
    const result: IResponse<any> = { status: EResponseStatus.error, code: code, message: message };
    return result;
};