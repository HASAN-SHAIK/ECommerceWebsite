import React, { useEffect, useState } from 'react';
import './AdminCustomersPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, Form, Card, Row, Col } from "react-bootstrap";
import axios from 'axios';

const AdminCustomersPage = () => {
    const [isLoading, setIsLoading] =useState(false);
    const [showModal, setShowModal] = useState(false);
    const [teamData, setTeamData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTeam, setFilteredTeam] = useState([]);
    const handleAddMember = async (event) => {
      event.preventDefault();
      setIsLoading(true)
      const values = event.target;
      setShowModal(false);
      try{
      const response = await axios.post(`http://localhost:8080/api/admin/addadmin`,{
          name: values[0].value,
          displayname: values[1].value,
          email: values[2].value,
          password: values[3].value,
          position: values[4].value,
          role:  values[5].value,
          mobile: (Number)(values[6].value)
      });
      setFilteredTeam(response.data);
      setTeamData(response.data);
      alert("Member Added")
      }
      catch(err){
          console.log("Error", err);
      }
      setIsLoading(false)
    };
  // Sample team data
  useEffect(()=>{
    const getTeam = async (req, res) => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin")
      setTeamData(response.data);
      setFilteredTeam(response.data);
    } catch (error) {
      console.log("Error in Admin Customer Page", error)
    }
  }
  getTeam();
  },[])

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = teamData.filter(member => 
      member.name.toLowerCase().includes(value) || 
      member.position.toLowerCase().includes(value)
    );
    setFilteredTeam(filtered);
  };

  return (
    <div className="customer-page">
      <div className="admin-customer-header">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search by name or role" 
            value={searchTerm} 
            onChange={handleSearch} 
          />
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <button className="add-member" onClick={() => setShowModal(true)}>
          <FontAwesomeIcon icon={faUserPlus} /> Add Member
        </button>
        
      </div>

      <div className="team-grid">
      <div className='row '>
        {filteredTeam.map(member => (
            <div key={member.id} className='col-4 mt-2'>
          <div className="team-card ml-2 m-3">
            <img src='https://img.freepik.com/free-photo/smiley-businesswoman-posing-outdoors-with-arms-crossed-copy-space_23-2148767055.jpg?semt=ais_hybrid' alt={member.name} className="avatar" />
            <h3>{member.name}</h3>
            <p>{member.position}</p>
            <div className="email">
              <FontAwesomeIcon icon={faEnvelope} /> <a href={`mailto:${member.email}`}>{member.email}</a>
            </div>
          </div>
          </div>
        ))}
        </div>
      </div>

      {/* Pagination (simple static example, can be expanded) */}
      <div className="pagination">
        <button className="page-btn">Prev</button>
        <span className="page-text">1</span>
        <button className="page-btn">Next</button>
      </div>



      <Modal className="modal-class text-dark"  show={showModal} onHide={() =>{setIsLoading(false); setShowModal(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Add Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddMember}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text"  required />
            </Form.Group>
            <Form.Group>
              <Form.Label>DisplayName</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="text"   required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Position</Form.Label>
              <Form.Control type="text"   required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control type="text"   required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="text"  required />
            </Form.Group>
            <Button type="submit" variant="dark" className="mt-3">
              Add Member
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
     
    </div>
  );
};

export default AdminCustomersPage;