import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Funds {
  @PrimaryColumn('uuid')
  public id: string;

  @Column({ default: 0 })
  public balance: number;

  @CreateDateColumn({ name: 'created_date' })
  public createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  public updatedDate: Date;
}
