import { ApiProperty } from '@nestjs/swagger';

export class ReturnNotFoundAssignmentList {
  @ApiProperty({
    example: 'lista de atribuições não encontrada',
    description:
      'Mensagem de erro quando a lista de atribuições não é encontrada'
  })
  message: string;

  @ApiProperty({
    example: 'Not Found',
    description: 'Tipo de erro quando a lista de atribuições não é encontrada'
  })
  error: string;

  @ApiProperty({
    example: 404,
    description: 'Código de status HTTP para Não Encontrado'
  })
  statusCode: number;
}

export class ReturnOneNotFoundAssignmentList {
  @ApiProperty({
    example:
      'lista de atribuições não encontrada com o Id 0e540daf-c9a1-48d4-8f9c-c4c5ba5f382e',
    description:
      'Mensagem de erro quando uma lista de atribuições específica não é encontrada'
  })
  message: string;

  @ApiProperty({
    example: 'Not Found',
    description:
      'Tipo de erro quando uma lista de atribuições específica não é encontrada'
  })
  error: string;

  @ApiProperty({
    example: 404,
    description: 'Código de status HTTP para Não Encontrado'
  })
  statusCode: number;
}
