import { Body, Controller, Delete, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createCommentt.dto';
import { Comment } from './schemas/comment.schema';
import { EditCommentDto } from './dto/editComment.dto';

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post()
    async createComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
        return this.commentService.createComment(createCommentDto);
    }

    @Post('/edit')
    async editComment(@Body() editCommentDto: EditCommentDto): Promise<Comment> {
        return this.commentService.editComment(editCommentDto);
    }

    @Delete()
    async deleteComment(@Body() commentId: string ): Promise<boolean> {
        return this.commentService.deleteComment(commentId);
    }
}
