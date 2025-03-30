import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from "@nestjs/common";
import { CartierService } from "./cartier.service";
import { Cartier } from "src/cartier/schemas/cartier.schema";
import { CreateCartierDto } from "./dto/createCartier.dto";
import { JwtAuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/role.guard";
import { Roles } from "src/common/decorators/role.decorator";
import { Role } from "src/common/enums/role.enum";

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

    // @UseGuards(JwtAuthGuard)
    // @UseGuards(RolesGuard)
    // @Roles(Role.Admin)
    @Post()
    async createCartier(@Body() createDto: CreateCartierDto): Promise<Cartier> {
        return this.cartierService.createCartier(createDto);
    }

}
