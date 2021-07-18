import Configuration from "./api";

class CompanyService {
  constructor(token) {
    this.config = new Configuration(token, null, "api/companies");
  }

  /**
   * @method all list companies
   * @return {Promise} result object providers
   */
  async all() {
    return this.config.API.get(``).then(response => {
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

  /**
   * @method edit patch company by id
   * @return {Promise} result object ok or failed
   */
   async edit(id, company) {
    return this.config.API.patch(`/${id}`, company).then(response => {
      if (response.status !== 200) {
        return this.config.handleResponseError(response);
      }
      return response.data;
    });
  }
}

export default CompanyService;
