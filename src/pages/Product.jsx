import React from 'react'
import { Row, Col, Card, Image, Descriptions, Spin } from "antd";
import useSWR from 'swr';
import axios from "axios";
import { useParams } from 'react-router-dom';
const Product = () => {
  let { id } = useParams();
  const fetcher = url => axios.get(url).then(res => res.data)
  const {data:SingleProduct, error } = useSWR(`http://localhost:4000/products/${id}`, fetcher);
  // console.log("data",data);
  return (
    <div>
        <Card title="View Product Detials">
     <Row gutter={[0, 20]}>
     <Col span={8}>
              <Image
                width={200}
                src={`https://loremflickr.com/320/240/dress?random=${id}`}
              />
            </Col>
            <Col span={16}>
            <Descriptions title="User Info" layout="vertical">
            <Descriptions.Item label="name">{SingleProduct?.title}</Descriptions.Item>
     <Descriptions.Item label="description">{SingleProduct?.description}</Descriptions.Item>
     <Descriptions.Item label="price">{SingleProduct?.price}</Descriptions.Item>
     <Descriptions.Item label="category" span={2}>
      {SingleProduct?.category}
     </Descriptions.Item>

            </Descriptions>
              </Col>
     </Row>


     </Card>
   
    </div>
  )
}

export default Product