import { ConfigService } from '@nestjs/config';

import { getMikroOrmConfigForApp } from './orm-config';

// for migrations
export default getMikroOrmConfigForApp(new ConfigService());
