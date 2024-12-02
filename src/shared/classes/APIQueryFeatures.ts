import { Model, Query } from "mongoose";

class APIQueryFeatures<T> {
  private documentModel: Model<T>;
  private requestQueryObject: Record<string, any>;
  private mongooseQuery: Query<T[], T>;

  constructor(
    documentModel: Model<T>,
    requestQueryObject: Record<string, any>
  ) {
    this.documentModel = documentModel;
    this.requestQueryObject = requestQueryObject;
    this.mongooseQuery = this.documentModel.find();
  }

  public filterQuery() {
    const initial = { ...this.requestQueryObject };
    const excludeFields = ["sort", "page", "fields", "limit"];
    excludeFields.forEach((field) => delete initial[field]);

    // Convert query operators (e.g., gt, gte) into MongoDB syntax
    let queryString = JSON.stringify(initial);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    const searchQuery = JSON.parse(queryString);

    this.mongooseQuery = this.mongooseQuery.find(searchQuery);
    return this;
  }

  public sortDocument() {
    if (this.requestQueryObject.sort) {
      const sortingFields = this.requestQueryObject.sort.replaceAll(",", " ");
      this.mongooseQuery = this.mongooseQuery.sort(sortingFields);
    }
    return this;
  }

  public limitFields() {
    if (this.requestQueryObject.fields) {
      const selectedFields = this.requestQueryObject.fields.replaceAll(
        ",",
        " "
      );
      this.mongooseQuery = this.mongooseQuery.select(selectedFields);
    }
    return this;
  }

  public paginate() {
    const page = Math.max(1, Number(this.requestQueryObject.page) || 1); // Default to page 1
    const limit = Math.max(1, Number(this.requestQueryObject.limit) || 10); // Default to 10 items per page
    const skip = (page - 1) * limit;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }

  public async execute(): Promise<T[]> {
    return this.mongooseQuery.exec(); // Execute the query and return results
  }
}

export { APIQueryFeatures };
