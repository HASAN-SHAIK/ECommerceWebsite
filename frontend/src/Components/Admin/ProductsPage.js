import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Bars } from 'react-loading-icons'
import Circles from "react-loading-icons/dist/esm/components/circles";
import { isAccordionItemSelected } from "react-bootstrap/esm/AccordionContext";

const ProductsPage = () => {
  const [formData, setFormData] = useState({});
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState(null);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getProducts = (async (req, res) => {
      const response = await axios.get(`http://localhost:8080/api/products`);
      setProducts(response.data);
    });
    getProducts();
  }, [])

  const handleAddProduct = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    const values = event.target;
    setShowModal(false);
    try {
      const response = await axios.post(`http://localhost:8080/api/products/add`, {
        name: values[0].value,
        description: values[1].value,
        price: (Number)(values[2].value),
        image: values[3].value,
        rating: (Number)(values[4].value),
        countInStock: (Number)(values[5].value),
        category: values[6].value,
      });
      setProducts(response.data);
      alert("Product Added")
    }
    catch (err) {
      console.log("Error", err);
    }
    setIsLoading(false)
  };
  const updateProductState = (product) => {
    setDescription(product.description);
    setPrice(product.price);
    setImage(product.image);
    setStock(product.countInStock);
    setFormData({ ...product });
    setShowModal(true);
  }
  const handleEditProduct = async (event) => {
    event.preventDefault();
    const values = event.target;
    setShowModal(false);
    setEdit(false);
    try {
      const response = await axios.put(`http://localhost:8080/api/products/update/${formData._id}`, {
        name: values[0].value,
        description: values[1].value,
        price: (Number)(values[2].value),
        image: values[3].value,
        rating: (Number)(values[4].value),
        countInStock: (Number)(values[5].value),
        category: values[6].value,
      })
      setFormData({})
      setProducts(response.data.products);
      setIsLoading(false)
    }
    catch (err) {
      console.log("Error", err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const response = await axios.delete(`http://localhost:8080/api/products/delete/${productId}`);
    setProducts(response.data.products);
    setIsLoading(false);
  };

  return (
    <div className="container mt-5">
      {/* <h3 className="mb-4 text-center">Products Dashboard</h3> */}
      <div className="text-center">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Product
        </Button>
      </div>

      {isLoading ? <div className="text-center">  <Circles /> <div>Adding the Product</div></div> :
        <Row className="mt-4">
          {products && products.map((product) => (
            <Col md={4} lg={3} key={product.id} className="mb-4">
              <Card className="white-text position-relative" style={{ backgroundColor: "#333", height: '23em' }}>
                {product.popular && (
                  <span className="badge bg-warning" style={{ position: "absolute", top: 10, left: 10 }}>
                    Popular
                  </span>
                )}
                <Card.Img style={{ height: '12em' }} variant="top" src={product.image} />
                <Card.Body className="">
                  <Card.Title style={{ height: '2.5em' }}>{product.name}</Card.Title>
                  <Card.Text className="white-text">Price: Rs.{product.price}</Card.Text>
                  <div className="d-flex justify-content-between ">
                    <Button variant="outline-light" style={{ position: "absolute", bottom: '5px', left: '5px' }} onClick={() => { setEdit(true); setIsLoading(true); updateProductState(product) }}>
                      <i className="fa fa-edit"></i> Edit
                    </Button>
                    <Button variant="outline-danger" style={{ position: "absolute", bottom: '5px', right: '5px' }} onClick={() => { setIsLoading(true); handleDeleteProduct(product._id) }}>
                      {<> <i className="fa fa-trash"></i> Delete </>}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      }

      {/* Add Product Modal */}
      <Modal className="modal-class text-dark" show={showModal} onHide={() => { setIsLoading(false); setShowModal(false) }}>
        <Modal.Header closeButton>
          <Modal.Title>{edit ? "Update Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? handleEditProduct : handleAddProduct}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={edit ? formData.name : null} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={edit ? description : null} onChange={(evt) => setDescription(evt.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" value={edit ? price : null} onChange={(evt) => setPrice(evt.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" value={edit ? image : null} onChange={(evt) => setImage(evt.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <Form.Control type="number" value={edit ? formData.rating : null} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Stock Count</Form.Label>
              <Form.Control type="number" value={edit ? stock : null} onChange={(evt) => setStock(evt.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <select class="form-select" aria-label="Default select example">
                <option selected={formData.category == "Home&Kitchen"} value='Home&Kitchen'>Home&Kitchen</option>
                <option selected={formData.category == "Fitness"} value="Fitness">Fitness</option>
                <option selected={formData.category == "Lifestyle"} value="Lifestyle">Lifestyle</option>
                <option selected={formData.category == "Electronics"} value="Electronics">Electronics</option>
                <option selected={formData.category == "Accessories"} value="Accessories">Accessories</option>
              </select>
              {/* <Form.Control type="text" value={formData.length > 0 ? formData.category: null} required /> */}
            </Form.Group>
            <Button type="submit" variant="dark" className="mt-3">
              {edit ? "UpdateProduct" : "Add Product"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>





      <div style={{ width: '104.4%', backgroundColor: '#111', position: 'relative', bottom: 0, height: '7em', marginTop: '1em' }}>

      </div>
    </div>
  );
};

export default ProductsPage;