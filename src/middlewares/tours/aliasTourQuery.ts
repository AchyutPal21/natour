import { NextFunction, Request, Response } from "express";

function aliasTourQuery(
  fields: string,
  sort: string,
  page: string,
  limit: string
) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (fields) {
      req.query["fields"] = fields;
    }

    if (sort) {
      req.query["sort"] = sort;
    }

    if (page) {
      req.query["page"] = page;
    }

    if (limit) {
      req.query["limit"] = limit;
    }

    next();
  };
}

export { aliasTourQuery };
