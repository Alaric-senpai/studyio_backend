import { PartialType } from '@nestjs/mapped-types';
import { CreateFeeDto } from './create-fee.dto';

export class UpdateFeeDto extends PartialType(CreateFeeDto) {}
