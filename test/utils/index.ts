// import { DataSource } from 'typeorm';

// export const truncateTables = async (connection: DataSource) => {
//     const entities = connection.entityMetadatas;
//     for (const entity of entities) {
//         const repository = connection.getRepository(entity.name);
//         await repository.clear();
//     }
// };

import { DataSource } from 'typeorm';

export const truncateTables = async (connection: DataSource) => {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    try {
        await queryRunner.startTransaction();

        // 🔴 Disable foreign key constraints
        await queryRunner.query(`SET session_replication_role = 'replica'`);

        const entities = connection.entityMetadatas;
        for (const entity of entities) {
            await queryRunner.query(`TRUNCATE TABLE "${entity.tableName}" CASCADE`);
        }

        // 🟢 Re-enable foreign key constraints
        await queryRunner.query(`SET session_replication_role = 'origin'`);

        await queryRunner.commitTransaction();
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
    } finally {
        await queryRunner.release();
    }
};

export const isJwt = (token: string | null): boolean => {
    if (token == null) {
        return false;
    }

    const parts = token.split('.');
    if (parts.length != 3) {
        return false;
    }
    try {
        parts.forEach((part) => {
            Buffer.from(part, 'base64').toString('utf-8');
        });
    } catch (error) {
        if (error instanceof Error) {
            return false;
        }
        return false;
    }
    return true;
};

