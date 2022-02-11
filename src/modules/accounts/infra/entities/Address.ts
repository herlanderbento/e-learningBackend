import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("address")
class Address {
  @PrimaryColumn()
  id?: string;

  @Column()
  bi: string;

  @Column()
  phone: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  province: string;

  @Column()
  country: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Address };
