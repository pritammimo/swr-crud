import React from 'react';
import { Row, Col, Card, Typography, Spin } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import ProductItem from '../component/ProductItem';
import useSWR from 'swr'
import axios from "axios";
const fetcher = url => axios.get(url).then(res => res.data)
const Products = () => {
  const { data, error } = useSWR('http://localhost:4000/products', fetcher)
  console.log("data",data);
  return (
    <div>
      <Card title="Products Page">
        
         <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {data?.length >0 &&
          data?.map((item,i)=>(
            <ProductItem key={i} {...item}/>
          ))
          }

        </Row>
        </Card>
    </div>
  )
}

export default Products