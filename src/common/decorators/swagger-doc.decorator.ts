import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiMovedPermanentlyResponse,
} from '@nestjs/swagger';

type opt = 'shortenerGenerate' | 'redirectUrl';

export const swaggerDoc = (data: opt) => {
  switch (data) {
    case 'shortenerGenerate':
      return applyDecorators(
        ApiCreatedResponse({
          description: 'Generate a shortened url',
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'UUID auto generated',
                example: '123e4567-e89b-12d3-a456-426614174000',
              },
              originalUrl: {
                type: 'url',
                description: 'Original URL entered by the user',
                example: 'https://www.google.com',
              },
              shortenedUrl: {
                type: 'url',
                description: 'Generated shortened URL',
                example: 'https://localhost/jdy5gY',
              },
            },
          },
        }),
        ApiBadRequestResponse({
          description: 'Input request contain errors',
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'array',
                items: {
                  type: 'string',
                  description: 'List of generated errors',
                  examples: [
                    'property urls should not exist',
                    'url should not be empty',
                  ],
                },
              },
              error: {
                type: 'string',
                description: 'Error in text',
                example: 'Bad Request',
              },
              statusCode: {
                type: 'number',
                description: 'Status code error',
                example: 400,
              },
            },
          },
        }),
        ApiInternalServerErrorResponse({
          description: 'Internal server error',
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Internal error occurred associated with the api',
                example: 'Internal server error',
              },
              error: {
                type: 'string',
                description: 'Error in text',
                example: 'Internal server error',
              },
              statusCode: {
                type: 'number',
                description: 'Status code error',
                example: 500,
              },
            },
          },
        }),
      );
    case 'redirectUrl':
      return applyDecorators(
        ApiMovedPermanentlyResponse({
          description: 'Redirect to the set URL',
        }),
        ApiBadRequestResponse({
          description: 'Input request contain errors',
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'array',
                items: {
                  type: 'string',
                  description: 'List of generated errors',
                  examples: [
                    'property urls should not exist',
                    'url should not be empty',
                  ],
                },
              },
              error: {
                type: 'string',
                description: 'Error in text',
                example: 'Bad Request',
              },
              statusCode: {
                type: 'number',
                description: 'Status code error',
                example: 400,
              },
            },
          },
        }),
        ApiInternalServerErrorResponse({
          description: 'Internal server error',
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Internal error occurred associated with the api',
                example: 'Internal server error',
              },
              error: {
                type: 'string',
                description: 'Error in text',
                example: 'Internal server error',
              },
              statusCode: {
                type: 'number',
                description: 'Status code error',
                example: 500,
              },
            },
          },
        }),
      );
  }
};
