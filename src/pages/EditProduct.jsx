import React,{useState,useEffect} from 'react'
import { Input,Button,Row, Col,Card, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import useSWR, { useSWRConfig } from 'swr';
import axios from "axios";

const EditProduct = () => {
  let { id } = useParams();
  const [data2,setdata2]=useState("");
  const [data, setdata] = useState({
    title: "",
    category: "",
    price: "",
    description: ""
  });
  const { mutate } = useSWRConfig();
  const fetcher = url => axios.get(url).then(res => res.data);
  const {data:SingleProduct, error } = useSWR(`http://localhost:4000/products/${id}`, fetcher);
  console.log("Single",SingleProduct);
  
  useEffect(() => {
    if(SingleProduct !==""){
    setdata(SingleProduct)
    }
  }, [SingleProduct]);
  const handleChange=(e)=>{
    setdata({...data,[e.target.name]:e.target.value})
   }
   const handleSubmit=async(data)=>{
    console.log("handle",data);
    await axios.put(`http://localhost:4000/products/${id}`,data).then(res => {
   
    if(res?.status ===200){
      console.log(res?.data)
      setdata2(res.data)
    }
  });

  }
      console.log("bro",data2)
  return (
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
  )
}

export default EditProduct