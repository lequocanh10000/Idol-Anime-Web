import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private roles: number[]) {}
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const accept =  this.roles.includes(request.user.roleId);
        if(!accept) throw new ForbiddenException('Bạn không có quyền thao tác');
        return accept;
    }
}