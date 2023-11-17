import { User } from "models/user";
export {};
declare global {
    namespace Express {
        interface Request {
            user: User;
        }

        export interface Response {
            Success(message: string, data?: any, responseCode?: number): void;
            Error(message: string, data?: any, responseCode?: number): void;
            
        }
    }
}