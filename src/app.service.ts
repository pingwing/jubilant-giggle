import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthcheck(): string {
    return 'All good!'; // TODO: expand to check also database state
  }
}
