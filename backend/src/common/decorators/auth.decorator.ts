import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { Role } from "../enums/role.enum";
import { JwtAuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/role.guard";
import { ROLES_KEY } from "./role.decorator";

export function Auth(...roles: Role[]) {
	return applyDecorators(SetMetadata(ROLES_KEY, roles), UseGuards(JwtAuthGuard, RolesGuard));
}