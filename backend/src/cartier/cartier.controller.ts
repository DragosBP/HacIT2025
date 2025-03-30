import { Body, Controller, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { CartierService } from "./cartier.service";
import { Cartier } from "src/cartier/schemas/cartier.schema";
import { CreateCartierDto } from "./dto/createCartier.dto";

@Controller('cartier')
export class CartierController {
    constructor(private readonly cartierService: CartierService) {}

    @Get()
    async getAllCartiers(): Promise<Cartier[]> {
        return this.cartierService.getAllCartiers();
    }

    @Get(':id')
    async getOneCartier(@Param('id') id: string): Promise<Cartier> {
        const cartier = await this.cartierService.getOneCartier(id);
        if (!cartier) {
            throw new NotFoundException('Cartier not found');
        }
        return cartier;
    }

    @Post()
    async createCartier(@Body() createDto: CreateCartierDto): Promise<Cartier> {
        return this.cartierService.createCartier(createDto);
    }

}
