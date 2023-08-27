import axios from 'axios';

class TodoDataService{
    getAll(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get('https://jompy31.pythonanywhere.com/api/todos/');
    }
    createTodo(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post("https://jompy31.pythonanywhere.com/api/todos/", data);
    }
    updateTodo(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`https://jompy31.pythonanywhere.com/api/todos/${id}`, data);
    }
    deleteTodo(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`https://jompy31.pythonanywhere.com/api/todos/${id}`);
    }
    completeTodo(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`https://jompy31.pythonanywhere.com/api/todos/${id}/complete`);
    }
    getUserList(token) {
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.get('https://jompy31.pythonanywhere.com/api/users/');
      }
    getUserDetails(id, token) {
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.get(`https://jompy31.pythonanywhere.com/api/users/${id}/`);
      }
      updateUser(id, data, token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        console.log('Data sent to backend:', data); // Muestra los datos en la consola del navegador
        return axios.put(`https://jompy31.pythonanywhere.com/api/users/${id}/`, data);
      }
      deleteUser(id, token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`https://jompy31.pythonanywhere.com/api/users/${id}/delete/`)
        .then(response => {
          console.log(response.data); // Imprime la respuesta si la eliminación fue exitosa
        })
        .catch(error => {
          console.error(error); // Imprime el error si la eliminación falló
        });
      }
    login(data){
        return axios.post("https://jompy31.pythonanywhere.com/api/login/", data);
    }
    signup(data){
        return axios.post("https://jompy31.pythonanywhere.com/api/signup/", data);
    }
    
    sendEmail(data) {
      return axios.post('https://jompy31.pythonanywhere.com/send-email/', data);
    }
    sendEmailPreview(data) {
      return axios.post('https://jompy31.pythonanywhere.com/send-email-preview/', data);
    }
    getAllLeads(token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token;
      return axios.get('https://jompy31.pythonanywhere.com/api/leads/');
    }
  
    createLead(data, token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token;
      return axios.post('https://jompy31.pythonanywhere.com/api/leads/', data);
    }
  
    updateLead(id, data, token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token;
      return axios.put(`https://jompy31.pythonanywhere.com/api/leads/${id}/`, data);
    }
  
    deleteLead(id, token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token;
      return axios.delete(`https://jompy31.pythonanywhere.com/api/leads/${id}/`);
    }
    getLeadComments(id, token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token;
      return axios.get(`https://jompy31.pythonanywhere.com/api/leads/${id}/comments/`);
    }
  
    createCommentlead(data, token) {
      const commentData = {
        lead: data.lead,
        comment: data.comment,
      };
  
      axios.defaults.headers.common['Authorization'] = 'Token ' + token;
      return axios.post(`https://jompy31.pythonanywhere.com/api/leads/${data.lead}/comments/`, commentData);
    }
  
    updateComment(id, data, token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token;
      return axios.put(`https://jompy31.pythonanywhere.com/api/leads/comments/${id}/`, data);
    }
  
    deleteComment(leadId, commentId, token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token;
      return axios.delete(`https://jompy31.pythonanywhere.com/api/leads/comments/${leadId}/${commentId}/`);
    }

    getAllBlogPosts() {
      return axios.get('https://jompy31.pythonanywhere.com/api/blog/posts/');
  }
  
    createBlogPost(data, token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token;
      return axios.post('https://jompy31.pythonanywhere.com/api/blog/posts/', data);
    }
  
    updateBlogPost(id, data, token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token;
      return axios.put(`https://jompy31.pythonanywhere.com/api/blog/posts/${id}/`, data);
    }
  
    deleteBlogPost(id, token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token;
      return axios.delete(`https://jompy31.pythonanywhere.com/api/blog/posts/${id}/`);
    }
  
    getBlogPostComments(id, token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token;
      return axios.get(`https://jompy31.pythonanywhere.com/api/blog/posts/${id}/comments/`);
    }
  
    createComment(data, token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token;
      return axios.post(`https://jompy31.pythonanywhere.com/api/blog/posts/${data.blog_post}/comments/`, data);
    }
  
    updateComment(id, data, token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token;
      return axios.put(`https://jompy31.pythonanywhere.com/api/blog/posts/comments/${id}/`, data);
    }
  
    deleteComment(blogPostId, commentId, token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token;
      return axios.delete(`https://jompy31.pythonanywhere.com/api/blog/posts/${blogPostId}/comments/${commentId}/`);
    }
    
    createLike(blogPostId, userId, token) {
      const data = {
        blog_post: blogPostId,
        user: userId
      };
    
      axios.defaults.headers.common['Authorization'] = 'Token ' + token;
      return axios.post(`https://jompy31.pythonanywhere.com/api/blog/posts/${blogPostId}/likes/`, data);
    }
}
export default new TodoDataService();

