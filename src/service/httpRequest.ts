import axios from "axios";
export class HttpClient {
  baseUrl: string;
  constructor(url: string) {
    this.baseUrl = url;
  }
  async get(url: string) {
    return await axios.get(`${this.baseUrl}/${url}`);
  }
  async post(url: string, data:any) {
    return await axios.post(`${this.baseUrl}/${url}`, data);
  }
  async delete(url: string) {
    return await axios.delete(`${this.baseUrl}/${url}`);
  }
  async edit(url: string, data:any) {
    return await axios.put(`${this.baseUrl}/${url}`, data);
  }
}