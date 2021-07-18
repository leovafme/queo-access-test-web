import Configuration from "./api";

class EmployeeService {
  constructor(token) {
    this.config = new Configuration(token, null, "api/employees");
  }

  /**
   * @method all list employees
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
   * @method create create employee
   * @return {Promise} result generic response
   */
  async create(employee) {
    return this.config.API.post(``, employee).then(response => {
      if (response.status !== 200) {
        return this.config.handleResponseError(response);
      }
      return response.data;
    });
  }

  /**
   * @method delete employee by id 
   * @return {Promise} result object
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
   * @method get find employee by id
   * @return {Promise} result object employee record
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
   * @method edit patch employee by id
   * @return {Promise} result object ok or failed
   */
   async edit(id, employee) {
    return this.config.API.patch(`/${id}`, employee).then(response => {
      if (response.status !== 200) {
        return this.config.handleResponseError(response);
      }
      return response.data;
    });
  }
}

export default EmployeeService;
