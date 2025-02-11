import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  public async paginatedQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    paginationQuery.page = paginationQuery.page || 1;
    paginationQuery.limit = paginationQuery.limit || 10;
    const results = await repository.find({
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
      take: paginationQuery.limit,
    });
    /**
     * Create the request URLS
     */
    const baseURL =
      this.request.protocol + '://' + this.request.headers.host + '/';
    const newURL = new URL(this.request.url, baseURL);

    /**
     * Calculating page number
     */
    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginationQuery.limit);
    const nextPage =
      paginationQuery.page === totalPages
        ? paginationQuery.page
        : paginationQuery.page + 1;
    const previousPage =
      paginationQuery.page === 1
        ? paginationQuery.page
        : paginationQuery.page - 1;

    const finalResponse: Paginated<T> = {
      data: results,
      meta: {
        itemsPerPage: paginationQuery.limit,
        totalItems,
        currentPage: paginationQuery.page,
        totalPages: totalPages,
      },
      links: {
        first: `${newURL.origin}${newURL.pathname}?page=1&limit=${paginationQuery.limit}`,
        last: `${newURL.origin}${newURL.pathname}?page=${totalPages}&limit=${paginationQuery.limit}`,
        current: `${newURL.origin}${newURL.pathname}?page=${paginationQuery.page}&limit=${paginationQuery.limit}`,
        next: `${newURL.origin}${newURL.pathname}?page=${nextPage}&limit=${paginationQuery.limit}`,
        previous: `${newURL.origin}${newURL.pathname}?page=${previousPage}&limit=${paginationQuery.limit}`,
      },
    };
    return finalResponse;
  }
}
