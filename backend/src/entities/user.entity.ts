import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
}
