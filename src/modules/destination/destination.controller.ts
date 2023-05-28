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
import path, { join } from "path";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller("destination")
export class DestinationController {
  constructor(private destionationService: DestinationService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getDestinations(
    @Query() filter: FilterDestinationType
  ): Promise<Destination[]> {
    return this.destionationService.getDestinations(filter);
  }

  @Get("my")
  @UseGuards(JwtGuard)
  async getMyDestinationByUserId(
    @GetUser() user: User
  ): Promise<Destination[]> {
    return await this.destionationService.getMyDestinationByUserId(user);
  }

  @Get("new")
  @UseGuards(JwtGuard)
  async getNewDestinations(): Promise<Destination[]> {
    return this.destionationService.getNewDestinations();
  }

  @Get("image/:id/:number")
  findImageDestination(
    @Param("id") idName,
    @Param("number") number: number,
    @Res() res
  ): Observable<any> {
    return of(
      res.sendFile(
        join(
          process.cwd(),
          "public/images/destinations/" + idName + "/" + number + ".jpg"
        )
      )
    );
  }

  @Get("/:id")
  @UseGuards(JwtGuard)
  async getDestinationById(@Param("id") id: string): Promise<Destination> {
    return await this.destionationService.getDestinationById(id);
  }

  @Post()
  @UseGuards(JwtGuard)
  // @UseGuards(AdminRoleGuard)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "../../../public/images/destinations",
        filename: (req, file, cb) => {
          console.log(file);
          cb(
            null,
            new Date().toISOString().replace(/:/g, "-") +
              "-" +
              file.originalname
          );
        },
      }),
    })
  )
  async createDestination(
    @Body() createDestinationType: CreateDestinationType,
    @Req() _req,
    @GetUser() user: User,
    @UploadedFiles() file
  ): Promise<Observable<any>> {
    console.log(file);
    return of({ imagePath: file.path });
    // return this.destionationService.createDestination(
    //   user,
    //   createDestinationType
    // );
  }

  // @Get("/:id")
  // async getDestinationById(
  //   @Param("id", UUIDValidationPipe) id: string
  // ): Promise<Destination> {
  //   return await this.destionationService.getDestinationById(id);
  // }
}
