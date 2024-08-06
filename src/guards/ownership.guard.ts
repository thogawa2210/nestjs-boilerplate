import {
    Injectable,
    CanActivate,
    ExecutionContext,
    Logger,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class OwnershipGuard implements CanActivate {
    logger = new Logger(OwnershipGuard.name);
    canActivate(
      _context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      console.log("🚀 ~ OwnershipGuard ~ _context:", _context)
      // NOTICE: ROUTE GUARD
      this.logger.log('===TRIGGER ROUTE GUARD===');
      // IMPLEMENT QUERY FLASH-CARD DATA AND CHECK OWNERSHIP
      return true;
    }
  }
  