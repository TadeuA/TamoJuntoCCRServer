import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1606274656330
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'connection',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'connection',
      new TableForeignKey({
        name: 'UserProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.addColumn(
      'connection',
      new TableColumn({
        name: 'beneficiary_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'connection',
      new TableForeignKey({
        name: 'UserBeneficiary',
        columnNames: ['beneficiary_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('connection', 'UserProvider');

    await queryRunner.dropColumn('connection', 'provider_id');

    await queryRunner.dropForeignKey('connection', 'UserBeneficiary');

    await queryRunner.dropColumn('connection', 'beneficiary_id');
  }
}
