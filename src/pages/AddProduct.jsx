import React,{useState,useEffect} from 'react'
import { Input,Button,Row, Col,Card, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import useSWR, { useSWRConfig } from 'swr';
import axios from "axios";
const AddProduct = () => {
  const { mutate } = useSWRConfig();
  const [data, setdata] = useState({
    title: "",
    category: "",
    price: "",
    description: ""
  });
  const handleChange=(e)=>{
    setdata({...data,[e.target.name]:e.target.value})
   }
  const handleSubmit=async(data)=>{
   console.log(data);
   await axios.post(`http://localhost:4000/products`,data).then(res => {
  });
  }
  return (
   <>
   <Card title="Create a new Product">
    <Row gutter={[0, 20]}>
    <Col span={24}>
  <Input size="large" 
  placeholder="title"
  name="title"
   prefix={<UserOutlined />} 
   value={data?.title}
   onChange={handleChange}
   />
   </Col>
     <br />
     <br />
     <Col span={24}>
  <Input 
  size="large" 
  value={data?.category}
  name="category"
  placeholder="category"
  onChange={handleChange}
   prefix={<UserOutlined />} />
   </Col>
     <br />
     <br />
     <Col span={24}>
  <Input size="large"  value={data?.price}
  name="price"
  placeholder="price" prefix={<UserOutlined />} onChange={handleChange}/>
   </Col>
     <br/>
     <br/>
     <Col span={24}>
  <Input size="large"  value={data?.description}
  name="description"
  placeholder="description" prefix={<UserOutlined />} onChange={handleChange}/>
   </Col>
     <br/>
     <br/>
     <Button type="primary" size="large" 
     onClick={async () => {
      const options = { optimisticData: data, rollbackOnError: true }
      mutate('/api/user', handleSubmit(data), options);
    }}
    //  onClick={handleSubmit}
               >
           Submit
         </Button>
         </Row>
         </Card>
   </>
  )
}

export default AddProduct