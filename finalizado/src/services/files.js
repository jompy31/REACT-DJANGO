import axios from 'axios';

class FileDataService {
  getAll(token) {
    // axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get('https://jompy31.pythonanywhere.com/files/');
  }

  uploadFile(data, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.post("https://jompy31.pythonanywhere.com/files/", data);
  }

  deleteFile(id, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.delete(`https://jompy31.pythonanywhere.com/files/file/${id}/delete/`);
  }
  getAllPost() {
    return axios.get('https://jompy31.pythonanywhere.com/files/news/');
  }

  createNewsPost(data, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.post('https://jompy31.pythonanywhere.com/files/news/', data);
  }

  updateNewsPost(id, data) {
    return axios.put(`https://jompy31.pythonanywhere.com/files/news/${id}/`, data);
  }

  deleteNewsPost(id) {
    return axios.delete(`https://jompy31.pythonanywhere.com/files/news/${id}/`);
  }
  getAllDistributor() {
    // axios.defaults.headers.common['Authorization'] = 'Token ' + token;
    return axios.get('https://jompy31.pythonanywhere.com/files/distributors/');
  }

  createDistributor(data, token) {
    axios.defaults.headers.common['Authorization'] = 'Token ' + token;
    return axios.post('https://jompy31.pythonanywhere.com/files/distributors/', data);
  }

  updateDistributor(id, data, token) {
    axios.defaults.headers.common['Authorization'] = 'Token ' + token;
    return axios.put(`https://jompy31.pythonanywhere.com/files/distributors/${id}/`, data);
  }

  deleteDistributor(id, token) {
    axios.defaults.headers.common['Authorization'] = 'Token ' + token;
    return axios.delete(`https://jompy31.pythonanywhere.com/files/distributors/${id}/`);
  }
}

export default new FileDataService();
