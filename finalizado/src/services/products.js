import axios from 'axios';

class ProductDataService {
  getAll(token) {
    // axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get('https://jompy31.pythonanywhere.com/products/');  // Cambiar la URL
  }

  createProduct( data, token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
      return axios.post("https://jompy31.pythonanywhere.com/products/", data);  // Cambiar la URL
    }
    uploadProduct(id, data, token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
      return axios.put(`https://jompy31.pythonanywhere.com/products/${id}/`, data);  // Use the correct URL for updating a product
    }

  deleteProduct(id, token) {
    // axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.delete(`https://jompy31.pythonanywhere.com/products/product/${id}/delete/`);  // Cambiar la URL
  }
  getAllCharacteristics(token) {
    // axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get('https://jompy31.pythonanywhere.com/products/characteristics/');  // URL para obtener características
  }

  createCharacteristic(data, token) {
    // axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.post("https://jompy31.pythonanywhere.com/products/characteristics/", data);  // URL para crear característica
  }

  updateCharacteristic(id, data, token) {
    // axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.put(`https://jompy31.pythonanywhere.com/products/characteristics/${id}/`, data);  // URL para actualizar característica
  }

  deleteCharacteristic(id, token) {
    // axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.delete(`https://jompy31.pythonanywhere.com/products/characteristics/${id}/`);  // URL para eliminar característica
  }
}

export default new ProductDataService();
