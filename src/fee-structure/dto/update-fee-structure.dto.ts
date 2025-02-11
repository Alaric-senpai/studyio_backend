import { PartialType } from '@nestjs/mapped-types';
import { CreateFeeStructureDto } from './create-fee-structure.dto';

export class UpdateFeeStructureDto extends PartialType(CreateFeeStructureDto) {}
