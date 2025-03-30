import { Body, Injectable, Param } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cartier } from "src/cartier/schemas/cartier.schema";
import { CreateCartierDto } from "./dto/createCartier.dto";

@Injectable()
export class CartierService {
    constructor(@InjectModel(Cartier.name) private cartierModel: Model<Cartier>) {}

    async createCartier(createDto: CreateCartierDto): Promise<Cartier> {
        const cartier = new this.cartierModel(createDto);
        return cartier.save();
    }
    

    async getAllCartiers(): Promise<Cartier[]> {
        return this.cartierModel.find().populate("reviews").exec();
    }

    async getOneCartier(id: string): Promise<Cartier> {
        return this.cartierModel.findById(id).populate("reviews").exec();
    }

    async getCartierByName(name: string): Promise<Cartier[]> {
        return this.cartierModel.find({ name }).populate("reviews").exec();
    }
}
