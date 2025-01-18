# typescript_mongodb
This project setup in typescript, MongoDB and PostgreSQL for production.

# TypeORM
- #### You can create a new entity using CLI: 
```bash
  typeorm entity:create path-to-entity-dir/entity/
  Ex:- npx typeorm entity:create src/entity/Admin
```

- #### You can create a new subscriber using CLI:
```bash
  typeorm subscriber:create path-to-subscriber-dir/subscriber
  Ex:- npx typeorm subscriber:create src/entity/Admin
```

- #### You can create a new migration using CLI:
```bash
  typeorm migration:create path-to-migrations-dir/migrationName
  Ex:- npx typeorm migration:create src/entity/1737215738554-migration.ts
```