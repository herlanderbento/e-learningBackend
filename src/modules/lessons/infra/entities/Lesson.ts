import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Exclude, Expose } from "class-transformer";

@Entity("lessons")
class Lesson {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  video: string;

  @Column()
  module_id: string;

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

export { Lesson };
