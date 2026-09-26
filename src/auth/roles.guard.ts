import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(_context: ExecutionContext): boolean {
    // Access control based on role disabled — all authenticated users have full access
    return true;
  }
}
