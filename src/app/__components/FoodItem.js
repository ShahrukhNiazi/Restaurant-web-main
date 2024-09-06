import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const AddFoodItem = () => {
    // Initialize with an empty array
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        loadFoodItems();
    }, []);

    const loadFoodItems = async () => {
        try {
            let response = await fetch("http://localhost:3000/api/restaurant/foods/66c639deaf293571edfe213e");
            response = await response.json();

            if (response.success) {
                setFoodItems(response.result);
            } else {
                alert("Food item list not loading");
            }
        } catch (error) {
            console.error("Error fetching food items:", error);
            alert("An error occurred while fetching food items.");
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <table border="1" className='table mt-5 mb-5'>
                        <thead>
                            <tr>
                                <th>S.N</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodItems.length > 0 ? (
                                foodItems.map((item, key) => (
                                    <tr key={key}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td> {/* Assuming you want to show price here */}
                                        <td>{item.description}</td>
                                        <td><img src={item.img_path} alt={item.name} style={{ width: '50px', height: '50px' }} /></td>
                                        <td>
                                            <Button className="btn btn-primary">Delete</Button>
                                            <Button className="btn btn-primary">Edit</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No food items available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    );
};

export default AddFoodItem;