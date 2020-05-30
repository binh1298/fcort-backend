import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class SeedRoles1590832000335 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const roles = await getRepository('role').save([
      {
        name: 'admin',
      },
      {
        name: 'user',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
