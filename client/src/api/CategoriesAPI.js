import {useState, useEffect} from 'react'
import axios from 'axios'

function CategoriesAPI() {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getCategories = async () =>{
            const res = await axios.get('/api/category')
            console.log(res, "8888888")
            setCategories(res.data)
        }

        getCategories()
    },[callback])
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategoriesAPI
