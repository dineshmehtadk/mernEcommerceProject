import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import {useAlert} from "react-alert";
import { clearErrors, updateProduct, getProductDetails } from '../../actions/productAction';
import {  UPDATE_PRODUCT_RESET } from '../../constants/productConstant';
import { Button } from "@material-ui/core";
import MetaData from "../Layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import "./NewProduct.css"


const UpdateProduct = ({history, match}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error, product} = useSelector((state)=> state.productDetails)

    const {error : updateError, isUpdated, loading} = useSelector((state)=> state.deleteProduct)
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Laptop",
        "electronic",
        "Footware",
        "Bottoms",
        "Tops",
        "Attire",
        "Camera",
        "Smartphones"
    ];

    const productId = match.params.id

    useEffect(()=>{
        if(product && product._id !== productId){
            dispatch(getProductDetails(productId))
        }
        else{
            setName(product.name)
            setDescription(product.description);
            setPrice(product.price);
            setStock(product.stock);
            setOldImages(product.images)
            setCategory(product.category)
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors)
        }
        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors)
        }
        if(isUpdated){
            alert.success("Product Updated  Successfully");
            history.push("/admin/products")
            dispatch({type: UPDATE_PRODUCT_RESET})
        }
    }, [dispatch, alert, isUpdated, history, error, productId, product, updateError])

    const updateProductSubmitHandler = (e)=>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);

        images.forEach((image) =>{
            myForm.append("images", image)
        })
        dispatch(updateProduct(productId,myForm))

    }

    const createProductImagesChange = (e)=>{
        const files = Array.from(e.target.files )
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file)=>{
            const reader = new FileReader();

            reader.onload = ()=>{
                if(reader.readyState === 2){
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result])
                }
            }
            reader.readAsDataURL(file);

        })

    }


  return (
    <Fragment>
        <MetaData title="Create Product"  />
        <div className="dashboard">
            <Sidebar />
            <div className="newProductContainer">
                <form className="createProductForm" 
                encType="multipart/form-data" 
                onSubmit={updateProductSubmitHandler}>
                    <h1>Create Product</h1>
                    <div>
                        <SpellcheckIcon />
                        <input 
                        type="text"
                        placeholder="Product Name"
                        required
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                         />
                    </div>
                    <div>
                        <DescriptionIcon />
                        <textarea
                         placeholder="Product Description"
                         value={description}
                         onChange={(e)=> setDescription(e.target.value)}
                         cols="30"
                         rows = "1"
                        />

                        
                    </div>
                    <div>
                        <AttachMoneyIcon />
                        <input
                            type="number"
                            placeholder="Price"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <AccountTreeIcon />
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Choose Category</option>
                            {categories.map((cate) => (
                            <option key={cate} value={cate}>
                                {cate}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <StorageIcon />
                        <input
                            type="number"
                            placeholder="Stock"
                            required
                            value={stock}
                            onChange={(e)=> setStock(e.target.value)}
                         />
                    </div>
                    <div id="createProdcutFormFile">
                        <input 
                            type="file"
                            name = "avatar"
                            accept = "image/* "
                            onChange={createProductImagesChange}
                            multiple
                        />
                    </div>
                    <div id="createProductFormImage">
                        {oldImages&& oldImages.map((image, index) => (
                            <img key={index} src={image.url} alt="Old Product Preview" />
                                       ))}
                    </div>
                    <div id="createProductFormImage">
                        {imagesPreview.map((image, index) => (
                            <img key={index} src={image} alt="Product Preview" />
                        ))}
                    </div>
                    <Button id="createProductBtn"
                        type="submit"
                      
                        disabled = {loading? true : false}
                        >
                            Submit

                    </Button>

                </form>

            </div>

        </div>
    </Fragment>
  )
}

export default UpdateProduct