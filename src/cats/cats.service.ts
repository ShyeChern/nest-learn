import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Cat } from './cats.model';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private readonly cats = [];

  constructor(
    @InjectModel(Cat)
    private catModel: typeof Cat,
  ) {}
  async create(cat: CreateCatDto) {
    // try {
    //   const result = await this.catModel.create({
    //     name: 'Jane',
    //     age: 2,
    //     breed: '3',
    //   });
    // } catch (e) {
    //   console.log(e.message);
    // }
    this.cats.push(cat);
  }

  findOne(id: number) {
    return `${id} Method not implemented.`;
    this.catModel.findAll();
  }

  async findAll(): Promise<Cat[]> {
    // const cats = await this.catModel.findAll({
    //   attributes: ['id', 'name', 'age'],
    //   raw: true,
    // });
    return this.cats;
  }
}
