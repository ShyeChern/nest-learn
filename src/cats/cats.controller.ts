import {
  Body,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  Version,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCatDto, createCatSchema } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { UsersService } from 'src/users/users.service';
import { Role, Roles } from 'src/common/decorators/roles.decorator';
import { Cron } from '@nestjs/schedule';
import { Cookies } from 'src/common/decorators/cookies.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage, imageFilter } from 'src/common/utils/upload';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Public } from 'src/common/decorators/public.decorator';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from 'src/common/pipe/joiValidation.pipe';

// handle specific host
// @Controller({ host: 'admin.example.com' })
@ApiTags('cats')
@UseInterceptors(CacheInterceptor)
@Controller('cats')
@Roles(Role.Admin, Role.User)
export class CatsController {
  constructor(
    private catsService: CatsService,
    private UsersService: UsersService,
  ) {}

  @Get()
  @Public()
  @SkipThrottle()
  // will auto resolve the promise
  async findAll(): Promise<any[]> {
    return this.catsService.findAll();
  }

  @Version('2')
  @Get()
  @Throttle(20, 60)
  @ApiQuery({
    name: 'q',
    type: String,
    description: 'A parameter q. Optional',
    required: false,
  })
  findAllV2(
    @Query('q') q: string,
    @Cookies('name') name: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): string {
    console.log(q, name);
    res.cookie('name', 'value', {
      maxAge: 60000,
      httpOnly: true,
      secure: true,
      signed: true,
    });
    return 'this is v2';
  }

  @Get(':id')
  @Roles(Role.Admin)
  // set no cache, put negative because 0 get falsy value (issue)
  // https://github.com/nestjs/nest/issues/6870#issuecomment-817178920
  @CacheTTL(-1)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  // wildcard path
  @Get('ab*cd')
  @HttpCode(500)
  @Header('Cache-Control', 'none')
  @Header('test', 'valuue')
  wildcard() {
    return 'This route uses a wildcard';
  }

  // redirect, can overwrite by return value
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Post()
  @ApiHeader({
    name: 'csrf-token',
    description: 'Csrf token',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiQuery({
    name: 'q',
    type: String,
    description: 'A parameter q. Optional',
    required: false,
  })
  @UsePipes(new JoiValidationPipe(createCatSchema))
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  // handle response urself
  @Get('self')
  handleUrself(@Res() res: Response): void {
    res.status(500).send({ test: 'data', wqe: 123 });
  }

  // every 30 minutes between 9am and 5pm
  @Cron('0 */30 9-17 * * *')
  handleCron() {
    console.log('cron job executed', new Date());
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage(''),
      fileFilter: imageFilter,
      limits: { fileSize: 5000000 },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @Get('dl/file')
  getFile(@Res({ passthrough: true }) res: Response): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="package.json"',
    });
    return new StreamableFile(file);
  }

  @Get('get/csrf')
  @CacheTTL(-1)
  generateCsrf(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): string {
    const csrf = req.csrfToken();
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return csrf;
  }
}
