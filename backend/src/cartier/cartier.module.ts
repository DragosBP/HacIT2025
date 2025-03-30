import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CartierService } from "./cartier.service";
import { CartierController } from "./cartier.controller";
import { Cartier, CartierSchema } from "src/cartier/schemas/cartier.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Cartier.name, schema: CartierSchema }])
    ],
    providers: [CartierService],
    controllers: [CartierController],
    exports: [MongooseModule.forFeature([{ name: Cartier.name, schema: CartierSchema }])] 
})
export class CartierModule {}
