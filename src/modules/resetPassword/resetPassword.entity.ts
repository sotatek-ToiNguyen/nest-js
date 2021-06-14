import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, BeforeUpdate } from 'typeorm';

@Entity('password_resets')
export class ResetPasswordEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    token: string;

    @Column()
    role: number;

    @Column()
    time_expired: string;

    @Column({ type: "timestamp", nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: "timestamp", nullable: true })
    updated_at: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updated_at = new Date;
    }
}
