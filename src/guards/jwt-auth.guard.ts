import {
	CanActivate,
	ExecutionContext,
	Injectable,
	Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthorizationGuard implements CanActivate {
	logger = new Logger(JwtAuthorizationGuard.name);
	canActivate(
		_context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		console.log("🚀 ~ JwtAuthorizationGuard ~ _context:", _context)
		// NOTICE: CONTROLLER GUARD
		this.logger.log('===TRIGGER CONTROLLER GUARD===');
		// IMPLEMENT JWT GUARD LOGIC HERE
		return true;
	}
}
