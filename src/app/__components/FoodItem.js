import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Image from 'next/image';


const AddFoodItem = () => {
    // Initialize with an empty array
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        loadFoodItems();
    }, []);

    const loadFoodItems = async () => {
        const restaurantData = JSON.parse(localStorage.getItem('restaurantUser'));

        // Check if restaurantData exists and has an _id 

        if (!restaurantData || !restaurantData._id) {
            console.error("No restaurant data or _id found in localStorage");
            alert("No restaurant data found. Please log in or select a restaurant.");
            return;
        }

        const resto_id = restaurantData._id;
        console.log("Restaurant ID:", resto_id);

        try {
            let response = await fetch("http://localhost:3000/api/restaurant/foods/" + resto_id);
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


    const deletFoodItems = async (id) => {

        let response = await fetch("http://localhost:3000/api/restaurant/foods/" + id, {
            method: 'delete'
        });

        response = await response.json();
        if (response.success) {
            loadFoodItems();
        } else {
            alert("food item not deleted");
        }
    }


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
                                        <td>{key + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.description}</td>
                                        <td className='text-center'><img src={item.img_path} alt={item.name} width={80} height={80} /></td>
                                        <td className='text-center'>
                                            <Button className="btn btn-primary" onClick={()=>deletFoodItems(item._id)}>Delete</Button>
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