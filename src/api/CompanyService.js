import Configuration from "./api";

class CompanyService {
  constructor(token) {
    this.config = new Configuration(token, null, "api/companies");
  }

  /**
   * @method getCompanies list companies
   * @return {Promise} result object providers
   */
  async getCompanies(take = 5, skip = 0) {
    return this.config.API.get(``, {
      params: {
        skip,
        take
      }
    }).then(response => {
      if (response.status !== 200) {
        return this.config.handleResponseError(response);
      }
      return response.data;
    });
  }

  /**
   * @method createCompany create company
   * @return {Promise} result object providers
   */
  async createCompany(company) {
    return this.config.API.post(``, company).then(response => {
      if (response.status !== 200) {
        return this.config.handleResponseError(response);
      }
      return response.data;
    });
  }

  /**
   * @method delete create company
   * @return {Promise} result object providers
   */
   async delete(id) {
    return this.config.API.delete(`/${id}`).then(response => {
      if (response.status !== 200) {
        return this.config.handleResponseError(response);
      }
      return response.data;
    });
  }

  /**
   * @method get find company by id
   * @return {Promise} result object company record
   */
   async get(id) {
    return this.config.API.get(`/${id}`).then(response => {
      if (response.status !== 200) {
        return this.config.handleResponseError(response);
      }
      return response.data;
    });
  }
}

export default CompanyService;
