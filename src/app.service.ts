import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  testServer(): string {
    return 'The server is OK!';
  }
}
