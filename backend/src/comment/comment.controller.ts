import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createCommentt.dto';
import { Comment } from './schemas/comment.schema';
import { EditCommentDto } from './dto/editComment.dto';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
        return this.commentService.createComment(createCommentDto);
    }

    @UseGuards(JwtAuthGuard)
    // @UseGuards(RolesGuard)
    // @Roles(Role.Admin, Role.User)
    @Post('/edit')
    async editComment(@Body() editCommentDto: EditCommentDto): Promise<Comment> {
        return this.commentService.editComment(editCommentDto);
    }

    @UseGuards(JwtAuthGuard)
    // @UseGuards(RolesGuard)
    // @Roles(Role.Admin, Role.User)
    @Delete()
    async deleteComment(@Body() commentId: string ): Promise<boolean> {
        return this.commentService.deleteComment(commentId);
    }
}
