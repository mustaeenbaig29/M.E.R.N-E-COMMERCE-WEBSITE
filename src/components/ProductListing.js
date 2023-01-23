import React from 'react'
import { useFilterContext } from '../context/FilterContext'
import GridView from './GridView'
import ListView from './ListView'

const ProductListing = () => {

    const {grid_view, filter_products} = useFilterContext()

    if(grid_view === true){
        return <GridView products={filter_products}/>
    }

    if(grid_view === false){
        return <ListView products={filter_products}/>
    }

}

export default ProductListing
