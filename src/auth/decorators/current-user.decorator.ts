import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "../schemas/use.schema";

export const CurrentUser = createParamDecorator(
    (data, context: ExecutionContext ): User => {
        const req = context.switchToHttp().getRequest()
        return req.user
    }
)