import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
	CallHandler,
	ExecutionContext,
	Inject,
	Injectable,
	NestInterceptor,
	UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class JwtCacheInterceptor implements NestInterceptor {
	constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

	async intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Promise<Observable<any>> {
		const request = context.switchToHttp().getRequest();
		const token = request.headers.authorization?.split(' ')[1];

		if (!token) throw new UnauthorizedException('Token is missing');

		const cachedStore = await this.cacheManager.get(token);
		console.log(
			'🚀 ~ JwtCacheInterceptor ~ intercept ~ cachedStore:',
			cachedStore,
		);
		if (cachedStore) {
			request.store = cachedStore;
		} else {
			try {
				// Xử lý store ở đây
				const store = 'store';
				await this.cacheManager.set(token, store);
				request.store = store;
			} catch (error) {
				// Handle error if needed
			}
		}

		return next.handle().pipe(
			tap(() => {
				// Additional logic after request handling if needed
			}),
		);
	}
}
