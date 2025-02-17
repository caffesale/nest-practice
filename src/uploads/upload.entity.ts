import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { fileTypes } from './enums/file-types.enum';

@Entity()
export class Upload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  path: string;

  @Column({
    type: 'enum',
    enum: fileTypes,
    default: fileTypes.IMAGE,
    nullable: false,
  })
  type: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  mime: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  size: number;
  createDate: Date;
  updateDate: Date;
}
