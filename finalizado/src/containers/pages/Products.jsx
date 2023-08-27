import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import ProductDataService from '../../services/products';
import { Link } from 'react-router-dom';
import Applications from '../../components/products/application';
import Footer from '../../components/navigation/Footer';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await ProductDataService.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  };

  return (
    <div>
      <div>
        <br/><br/><br/><br/><br/>
        {/* {selectedProduct ? selectedProduct.name : 'No products available'} */}
      </div>
      <div className="buttons_nav space-y-2 md:space-y-0 md:flex md:flex-wrap"> 
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className={`w-full md:w-auto md:mr-2 sm:mr-0 text-base md:text-xxs sm:text-xs ${
              selectedProduct === product ? 'bg-gray-200' : ''
            }`}
          >
            {product.name}
          </button>
        ))}
      </div>
      <div>
      {selectedProduct && (
      <div style={{ marginTop: '5%' }}>
        <h2>{selectedProduct.name}</h2>
        <div >{selectedProduct.description}</div>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ width: '50%' }}>
            <img src={selectedProduct.file} alt="Product" style={{ width: '100%', maxWidth: '400px', marginRight: '20px' }} />
          </div>
          <div style={{ width: '50%' }}>
          <table>
            <h1 style={{ color: 'black', fontWeight: 'bold' }}>{selectedProduct.name}</h1>
            <tbody>
              {selectedProduct.characteristics.map((characteristic, index) => (
                <React.Fragment key={characteristic.id}>
                  {index !== 0 && (
                    <tr style={{ height: '10px' }}>
                      <td colSpan="2"></td>
                    </tr>
                  )}
                  <tr>
                    <td colSpan="2" style={{ borderTop: '1px solid rgba(0, 0, 0, 0.2)' }}></td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ color: 'black' }}>{characteristic.name}</strong>
                    </td>
                    <td style={{ color: 'black' }}>{characteristic.description}</td>
                  </tr>

                </React.Fragment>
              ))}
                
          </tbody>
        </table>
        <br/><br/>
        <Link to="/contact" className="btn lg">
          REQUEST INFORMATION
        </Link>
        </div>

        </div>
      </div>
    )}

        {!selectedProduct && (
        <div>
        {products.map((product) => (
          <div key={product.id} style={{ marginTop: '5%' }}>
            <h2>{product.name}</h2>
            <div>{product.description}</div>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ width: '50%' }}>
                <img src={product.file} alt="Product" style={{ width: '100%', maxWidth: '400px', marginRight: '20px' }} />
              </div>
              <div style={{ width: '50%' }}>
                
              <table>
                <h1 style={{ color: 'black' , fontWeight: 'bold'}}>{product.name}</h1>
                <tbody>
                  {product.characteristics.map((characteristic, index) => (
                    <React.Fragment key={characteristic.id}>
                      {index !== 0 && (
                        <tr style={{ height: '10px' }}>
                          <td colSpan="2" style={{ borderTop: '1px solid rgba(0, 0, 0, 0.2)' }}></td>
                        </tr>
                      )}
                      <tr>
                        <td>
                          <strong style={{ color: 'black' }}>{characteristic.name}</strong>
                        </td>
                        <td style={{ color: 'black' }}>{characteristic.description}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <br/><br/>
              <Link to="/contact" className="btn lg">
                REQUEST INFORMATION
              </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
        )}
       <section className="APPLICATIONS">
          <Applications />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProductTable;
