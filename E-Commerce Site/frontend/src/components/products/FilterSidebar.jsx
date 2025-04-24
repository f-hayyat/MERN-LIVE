import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const FilterSidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        category: "",
        gender: "",
        color: "",
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 100,
    });
    const [priceRange, setPriceRange] = useState([0, 100]);

    const categories = ['Top Wear', 'Bottom Wear'];
    const colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Purple', 'Orange', 'Pink', 'Grey']
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    const materials = ['Cotton', 'Polyester', 'Linen', 'Wool', 'Silk', 'Denim', 'Leather', 'Nylon', 'Rayon', 'Cashmere']

    const brands = [
        'Nike', 'Adidas', 'Puma', 'Levi\'s', 'H&M', 'Zara', 'Tommy Hilfiger'
    ]
    const genders = ['Men', 'Women']

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);


        setFilters({
            category: params.category || "",
            gender: params.gender || "",
            color: params.color || "",
            size: params.size ? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [],
            brand: params.brand ? params.brand.split(",") : [],
            minPrice: params.minPrice || 0,
            maxPrice: params.maxPrice || 100,
        })
        setPriceRange([params.minPrice || 0, params.maxPrice || 100])
    }, [searchParams])
    return (
        <div className='p-4'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>Filters</h3>
            {/* category filter */}
            <div className='mb-4'>
                <h4 className='text-lg font-semibold text-gray-700 mb-2'>Category</h4>
                <ul className='flex flex-col gap-2'>
                    {categories.map((category) => (
                        <li key={category} className='flex items-center gap-2'>
                            <input
                                type="radio"
                                name="category"
                                id={category}
                                checked={filters.category === category}
                                onChange={() => {
                                    setFilters({ ...filters, category: category })
                                    setSearchParams({ ...filters, category: category })
                                }}
                                className="accent-black"
                            />
                            <label htmlFor={category} className='text-gray-600'>{category}</label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='mb-4'>
                <h4 className='text-lg font-semibold text-gray-700 mb-2'>
                    Gender
                </h4>
                <ul className='flex gap-2'>
                    {genders.map((gender) => (
                        <li key={gender} className='flex items-center gap-2'>
                            <input
                                type="radio"
                                name="gender"
                                id={gender}
                                checked={filters.gender === gender}
                                onChange={() => {
                                    setFilters({ ...filters, gender: gender })
                                    setSearchParams({ ...filters, gender: gender })
                                }}
                                className="accent-black"
                            />
                            <label htmlFor={gender} className='text-gray-600'>{gender}</label>
                        </li>
                    ))}
                </ul>
            </div>
            {/* color filter */}
            <div className='mb-4'>
                <h4 className='text-lg font-semibold text-gray-700 mb-2'>Color</h4>
                <ul className='flex flex-wrap gap-3'>
                    {colors.map((color) => (
                        <li key={color} className='flex items-center'>
                            <button
                                onClick={() => {
                                    setFilters({ ...filters, color: color })
                                    setSearchParams({ ...filters, color: color })
                                }}
                                className={`w-6 h-6 rounded-full border-2 ${filters.color === color ? 'border-black' : 'border-gray-300'}`}
                                style={{
                                    backgroundColor: color.toLowerCase(),
                                    boxShadow: filters.color === color ? '0 0 0 2px white inset' : 'none'
                                }}
                                title={color}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            {/* size filter */}
            <div className='mb-4'>
                <h4 className='text-lg font-semibold text-gray-700 mb-2'>Size</h4>
                <ul className='flex flex-wrap gap-2'>
                    {sizes.map((size) => (
                        <li key={size} className='flex items-center gap-2'>
                            <input
                                type="checkbox"
                                name="size"
                                id={size}
                                checked={filters.size.includes(size)}
                                onChange={() => {
                                    const newSizeFilter = filters.size.includes(size)
                                        ? filters.size.filter(s => s !== size)  // Remove if already selected
                                        : [...filters.size, size];  // Add if not selected

                                    setFilters({ ...filters, size: newSizeFilter });
                                    setSearchParams({ ...filters, size: newSizeFilter.join(",") });
                                }}
                                className="accent-black"
                            />
                            <label htmlFor={size} className='text-gray-600'>{size}</label>
                        </li>
                    ))}
                </ul>
            </div>
            {/* material filter */}
            <div className='mb-4'>
                <h4 className='text-lg font-semibold text-gray-700 mb-2'>Material</h4>
                <ul className='flex flex-wrap gap-2'>
                    {materials.map((material) => (
                        <li key={material} className='flex items-center gap-2'>
                            <input
                                type="checkbox"
                                name="material"
                                id={material}
                                checked={filters.material.includes(material)}
                                onChange={() => {
                                    const newMaterialFilter = filters.material.includes(material)
                                        ? filters.material.filter(m => m !== material)  // Remove if already selected
                                        : [...filters.material, material];  // Add if not selected

                                    setFilters({ ...filters, material: newMaterialFilter });
                                    setSearchParams({ ...filters, material: newMaterialFilter.join(",") });
                                }}
                                className="accent-black"
                            />
                            <label htmlFor={material} className='text-gray-600'>{material}</label>
                        </li>
                    ))}
                </ul>
            </div>
            {/* brand filter */}
            <div className='mb-4'>
                <h4 className='text-lg font-semibold text-gray-700 mb-2'>Brand</h4>
                <ul className='flex flex-wrap gap-2'>
                    {brands.map((brand) => (
                        <li key={brand} className='flex items-center gap-2'>
                            <input
                                type="checkbox"
                                name="brand"
                                id={brand}
                                checked={filters.brand.includes(brand)}
                                onChange={() => {
                                    const newBrandFilter = filters.brand.includes(brand)
                                        ? filters.brand.filter(b => b !== brand)  // Remove if already selected
                                        : [...filters.brand, brand];  // Add if not selected

                                    setFilters({ ...filters, brand: newBrandFilter });
                                    setSearchParams({ ...filters, brand: newBrandFilter.join(",") });
                                }}
                                className="accent-black"
                            />
                            <label htmlFor={brand} className='text-gray-600'>{brand}</label>
                        </li>
                    ))}
                </ul>
            </div>
            {/* price filter */}
            <div className='mb-4'>
                <h4 className='text-lg font-semibold text-gray-700 mb-2'>Price Range</h4>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[0]}
                    onChange={(e) => {
                        const newMinPrice = e.target.value;
                        setPriceRange([newMinPrice, priceRange[1]]);
                        setFilters({ ...filters, minPrice: newMinPrice });
                        setSearchParams({ ...filters, minPrice: newMinPrice });
                    }}
                    className="w-full accent-black"
                />
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => {
                        const newMaxPrice = e.target.value;
                        setPriceRange([priceRange[0], newMaxPrice]);
                        setFilters({ ...filters, maxPrice: newMaxPrice });
                        setSearchParams({ ...filters, maxPrice: newMaxPrice });
                    }}
                    className="w-full accent-black"
                />
                <div className='flex justify-between text-gray-600'>
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>
            {/* clear filters button */}
            <button
                onClick={() => {
                    setFilters({
                        category: "",
                        gender: "",
                        color: "",
                        size: [],
                        material: [],
                        brand: [],
                        minPrice: 0,
                        maxPrice: 100,
                    });
                    setPriceRange([0, 100]);
                    setSearchParams({});
                }}
                className="w-full py-2 bg-black text-white rounded hover:bg-gray-800"
            >
                Clear All Filters
            </button>

        </div>
    )
}

export default FilterSidebar;
