import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1622731506468 implements MigrationInterface {
    name = 'CreateUserTable1622731506468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('candidate', 'reviewer')`);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "name" TEXT NOT NULL,
                "email" TEXT NOT NULL,  
                "password" TEXT NOT NULL, 
                "role" "public"."user_role_enum" NOT NULL,
                CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`CREATE TYPE IF NOT EXISTS "user_responses_difficulty_enum" AS ENUM('easy', 'medium', 'hard')`);
        await queryRunner.query(`
        CREATE TABLE "user_responses" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "question" text NOT NULL,
          "response" text NOT NULL,
          "difficulty" "public"."user_response_question_difficulty_enum" NOT NULL,
          "skillId" int NOT NULL,
          "rating" int NOT NULL,
          "candidateId" uuid NOT NULL,
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
          "deletedAt" TIMESTAMP,
          CONSTRAINT "PK_97cf9bba840a3b9b406d3a93d17" PRIMARY KEY ("id"),
          CONSTRAINT "FK_97cf9bba840a3b9b406d3a93d17" FOREIGN KEY ("candidateId") REFERENCES "users"("id") ON DELETE CASCADE
        )
      `);
        await queryRunner.query(`ALTER TABLE "user_responses" ADD CONSTRAINT "CK_user_responses_skillId" CHECK ("skillId" >= 1 AND "skillId" <= 100)`);
        await queryRunner.query(`ALTER TABLE "user_responses" ADD CONSTRAINT "CK_user_responses_rating" CHECK ("rating" >= 0 AND "rating" <= 5)`);

        await queryRunner.query(`ALTER TABLE "user_responses" ADD CONSTRAINT "FK_user_responses_candidateId" FOREIGN KEY ("candidateId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE "user_responses" DROP CONSTRAINT "FK_user_responses_candidateId"`);
        await queryRunner.query(`DROP TABLE "user_responses"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "user_responses_difficulty_enum"`);

        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."user_role_enum"`);
    }
}
