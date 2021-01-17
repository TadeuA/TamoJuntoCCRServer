import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('connection')
class Connection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column()
  beneficiary_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'beneficiary_id' })
  beneficiary: User;

  @Column()
  value: number;

  @Column()
  description: string;

  @Column()
  office: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Connection;
// provider: string, date: Date
