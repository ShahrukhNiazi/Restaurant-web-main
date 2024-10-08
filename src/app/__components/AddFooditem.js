import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';

const AddFoodItems = (props) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [path, setPath] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(false);

    const handleAddFoodItem = async () => {
        console.log(name, price, path, description);

        if (!name || !price || !path || !description) {
            setError(true);
            return false;
        } else {
            setError(false);
        }

        let resto_id;
        const restaurantData = JSON.parse(localStorage.getItem('restaurantUser'));
        if (restaurantData) {
            resto_id = restaurantData._id;
        }

        try {
            let response = await fetch('http://localhost:3000/api/restaurant/foods', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, price, img_path: path, description, resto_id })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            console.log(data);

            if (data.success) {
                alert("Food item added");
                props.setAddItem(false);
                // No need to redefine `data`
                const newData = { ...data.data };
                 // Do something with `newData` if needed
            } else {
                alert("Failed to add food item");
            }

        } catch (error) {
            console.error("There was an error adding the food item:", error);
            alert("There was an error adding the food item.");
        }
    }

    return (
        <Container>
            <Row className='align-items-center justify-content-center'>
                <Col className='col-lg-6'>
                    <h1 className='mt-5 mb-3'>Add New Food Items</h1>
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Enter your food name"
                        className='mb-3'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        isInvalid={!!error.name}
                    />
                    {error && !name && <div className='inputerror'> Invalid food name </div>}

                    <br />
                    <Form.Control
                        size="lg"
                        type="number"
                        placeholder="Enter price"
                        className='mb-3'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        isInvalid={!!error.price}
                    />
                    {error && !price && <div className='inputerror'> Invalid food price </div>}
                    <br />
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Enter path"
                        className='mb-3'
                        value={path}
                        onChange={(e) => setPath(e.target.value)}
                        isInvalid={!!error.path}
                    />
                    {error && !path && <div className='inputerror'> Invalid food Path </div>}
                    <br />
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Enter description"
                        className='mb-3'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        isInvalid={!!error.description}
                    />
                    {error && !description && <div className='inputerror'> Invalid food Path </div>}
                    <br />
                    <Button className="btn btn-primary mt-2" onClick={handleAddFoodItem}>
                        Add Food Item
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default AddFoodItems;