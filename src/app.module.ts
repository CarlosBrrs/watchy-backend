import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthUtilityModule } from './shared/infrastructure/auth/auth-utility.module';
import { JwtAuthGuard } from './shared/infrastructure/auth/guards/jwt-auth.guard';
import { HealthModule } from '@modules/health/health.module';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { validate } from '@shared/infrastructure/env/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    AuthUtilityModule,
    HealthModule,
    UserModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
