"use client"

import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';


const EditAddFoodItems = (props) => {

    console.log(props.params.id)
    const router = useRouter();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [img_path, setPath] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        handleLoadFoodItem();
    }, [])



    const handleLoadFoodItem = async () => {
        let response = await fetch('http://localhost:3000/api/restaurant/foods/edit/' + props.params.id);
        response = await response.json();
        if (response.success) {
            console.log(response.result);
            setName(response.result.name)
            setPrice(response.result.price)
            setPath(response.result.img_path)
            setDescription(response.result.description)
        }

    }

    const handleAddFoodItem = async () => {
        console.log(name, price, img_path, description);
        if (!name || !price || !img_path || !description) {
            setError(true);
            return false;
        } else {
            setError(false);
        }

        let response = await fetch('http://localhost:3000/api/restaurant/foods/edit/' + props.params.id, {
            method: 'PUT',
            body: JSON.stringify({ name, price, img_path, description })
        });

        response = await response.json();

        if (response.success) {
            alert("data has bees updated ")
        }

    }


    return (
        <Container>
            <Row className='align-items-center justify-content-center'>
                <Col className='col-lg-6'>
                    <h1 className='mt-5 mb-5'>Update New Food Items</h1>
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
                        value={img_path}
                        onChange={(e) => setPath(e.target.value)}
                        isInvalid={!!error.img_path}
                    />
                    {error && !img_path && <div className='inputerror'> Invalid food Path </div>}
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
                    <Button className="btn btn-primary" onClick={handleAddFoodItem}>
                        Add Food Item
                    </Button>
                    <Button className="btn btn-primary m-3" onClick={() => router.push('../dashboard')}>
                        Back To Add Food Item
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default EditAddFoodItems;