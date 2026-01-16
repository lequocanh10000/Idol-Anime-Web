import { PartialType } from '@nestjs/mapped-types';
import { AddCharactersDto } from './add-charaacters.dto';

export class UpdateCharacterDto extends PartialType(AddCharactersDto) {}
