import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { DestinationService } from "./destination.service";
import { FilterDestinationType } from "./types/filter-destination.type";
import { Destination } from "./entity/destination.entity";
import { CreateDestinationType } from "./types/create-destination.type";
import { UUIDValidationPipe } from "src/pipes/uuid-validation.pipe";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../users/entity/user.entity";
import { JwtGuard } from "src/guards/jwt.guard";
import { log } from "console";
import { AdminRoleGuard } from "src/guards/admin.guard";
import { Observable, of } from "rxjs";
import path, { extname, join } from "path";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";

@Controller("destination")
export class DestinationController {
  constructor(private destinationService: DestinationService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getDestinations(
    @Query() filter: FilterDestinationType
  ): Promise<Destination[]> {
    return this.destinationService.getDestinations(filter);
  }

  @Get("my")
  @UseGuards(JwtGuard)
  async getMyDestinationByUserId(
    @GetUser() user: User
  ): Promise<Destination[]> {
    return await this.destinationService.getMyDestinationByUserId(user);
  }

  @Get("new")
  @UseGuards(JwtGuard)
  async getNewDestinations(): Promise<Destination[]> {
    return this.destinationService.getNewDestinations();
  }

  @Get("image/:id")
  findImageDestination(@Param("id") idName, @Res() res): Observable<any> {
    return of(
      res.sendFile(
        join(process.cwd(), "public/images/destinations/" + idName + ".jpg")
      )
    );
  }

  @Get("/:id")
  @UseGuards(JwtGuard)
  async getDestinationById(@Param("id") id: string): Promise<Destination> {
    return await this.destinationService.getDestinationById(id);
  }

  @Post()
  @UseGuards(JwtGuard, AdminRoleGuard)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./public/images/destinations",
        filename: (req, file, cb) => {
          req["destinationUuid"] = uuidv4(); // Simpan UUID destinasi di request object
          const filename = `${req["destinationUuid"]}.jpg`;
          cb(null, filename);
        },
      }),
    })
  )
  async createDestination(
    @Body() createDestinationType: CreateDestinationType,
    @Req() req: any, // Menggunakan tipe any pada parameter req
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Destination> {
    createDestinationType.uuid = req["destinationUuid"]; // Gunakan UUID yang sama untuk destinasi
    return await this.destinationService.createDestination(
      user,
      createDestinationType
    );
  }

  // @Get("/:id")
  // async getDestinationById(
  //   @Param("id", UUIDValidationPipe) id: string
  // ): Promise<Destination> {
  //   return await this.destionationService.getDestinationById(id);
  // }
}
