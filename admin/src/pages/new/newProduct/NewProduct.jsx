import React, { useContext, useEffect, useState } from "react";
import CategoryContext from "../../../context/Category";
import SubsubcategoryContext from "../../../context/Subsubcategory";
import SubcategoryContext from "../../../context/Subcategory";
import ProductContext from "../../../context/Product";

const ProductCreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    seller: "",
    price: "",
    offerPrice: "",
    variants: [
      {
        ram: "",
        storage: "",
        price: "",
        offerPrice: "",
        discountPercentage: "",
      },
    ],
    highlights: {},
    discountPercentage: "",
    stock: "",
    subSubcategoryId: "",
    description: "",
    about: [],
    warranty: "",
    rating: "",
    sizes: [],
    specifications: {},
    delivery: { estimatedDays: 5, cost: 0 },
    images: [],
  });

  const [cardImage, setCardImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setselectedSubCategory] = useState("");
  const [selectedSubsubcategory, setSelectedSubsubcategory] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    fetchSubsubcategories();
  }, []);

  const { categories, fetchCategories } = useContext(CategoryContext);
  const { subcategories, fetchSubcategories } = useContext(SubcategoryContext);
  const { subSubcategories, fetchSubsubcategories } = useContext(
    SubsubcategoryContext
  );
  const { setAddProduct, addProductData } = useContext(ProductContext);

  const [aboutList, setAboutList] = useState([]);

  const handleAddAbout = (e) => {
    e.preventDefault();
    if (!aboutList.trim()) return; // Prevent adding empty values

    setFormData((prevData) => ({
      ...prevData,
      about: [...(prevData.about || []), aboutList], // Add aboutList to the about array
    }));

    setAboutList(""); // Clear the input field
  };
  console.log(formData.about);

  const [highlightsKey, setHighlightsKey] = useState("");
  const [highlightsValue, setHighlightsValue] = useState("");

  const AddHighlights = (e) => {
    e.preventDefault(); // Prevent form submission
    if (!highlightsKey || !highlightsValue) {
      alert("Both key and value are required to add a highlight.");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      highlights: { ...prevData.highlights, [highlightsKey]: highlightsValue },
    }));

    setHighlightsKey(""); // Clear input after addition
    setHighlightsValue("");
  };

  const subcategoryMatch = subcategories.filter((subcategory) => {
    return subcategory.parentCategory === selectedCategory ? subcategory : null;
  });

  const subSubcategoryMatch = subSubcategories.filter((subsubcategory) => {
    return subsubcategory.parentSubcategory === selectedSubCategory
      ? subsubcategory
      : null;
  });

  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [size, setSize] = useState("");
  const [colors, setColors] = useState([
    { colorName: "", hexCode: "", images: [] },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  let defaultPrice = parseInt(formData.price);
  let discountPercentage = parseInt(formData.discountPercentage);

  const calculateOfferPrice = function () {
    let discountAmount = (defaultPrice * discountPercentage) / 100;
    return Math.floor(defaultPrice - discountAmount).toFixed(2);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCardImage(file);
    setImagePreview(URL.createObjectURL(file)); // Create a preview URL
  };

  const handleColorChange = (index, field, value) => {
    const updatedColors = [...colors];
    updatedColors[index][field] = value;
    setColors(updatedColors);
  };

  const handleImageChangeForColor = (index, e) => {
    const fileArray = Array.from(e.target.files);

    // Use existing images and add the new ones
    const updatedColors = [...colors];
    updatedColors[index].images = [
      ...updatedColors[index].images,
      ...fileArray,
    ];
    setColors(updatedColors);
  };

  const addColor = () => {
    setColors([...colors, { colorName: "", hexCode: "", images: [] }]);
  };

  const removeColor = (index) => {
    const updatedColors = colors.filter((_, i) => i !== index);
    setColors(updatedColors);
  };

  const removeImg = (colorIndex, imgIndex) => {
    const updatedColors = [...colors];
    const updatedImages = updatedColors[colorIndex].images.filter(
      (_, i) => i !== imgIndex
    );
    updatedColors[colorIndex].images = updatedImages;
    setColors(updatedColors);
  };
  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...formData.variants];

    // Update the specific field for the variant at the given index
    updatedVariants[index][field] = value;

    // Recalculate the offer price for the updated variant if necessary
    const price = updatedVariants[index].price || 0;
    const discountPercentage = updatedVariants[index].discountPercentage || 0;

    updatedVariants[index].offerPrice = Math.floor(
      price - (price * discountPercentage) / 100
    ).toFixed(2); // Round to 2 decimals

    // Update the state with the modified variants array
    setFormData({ ...formData, variants: updatedVariants });
  };

  const removeVariant = (index) => {
    const updatedVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: updatedVariants });
  };

  const addVariant = () => {
    const newVariant = {
      ram: "",
      storage: "",
      price: "",
      offerPrice: "",
      discountPercentage: "",
    };
    setFormData({ ...formData, variants: [...formData.variants, newVariant] });
  };

  const addSpecification = () => {
    setFormData({
      ...formData,
      specifications: { ...formData.specifications, [specKey]: specValue },
    });
    setSpecKey("");
    setSpecValue("");
  };

  const handleSpecificationKeyChange = (e, index) => {
    const newSpecifications = { ...formData.specifications };
    const oldKey = Object.keys(newSpecifications)[index];
    const newKey = e.target.value;

    if (newKey && newKey !== oldKey) {
      newSpecifications[newKey] = newSpecifications[oldKey];
      delete newSpecifications[oldKey];
      setFormData({ ...formData, specifications: newSpecifications });
    }
  };

  const handleSpecificationValueChange = (e, index) => {
    const newSpecifications = { ...formData.specifications };
    const key = Object.keys(newSpecifications)[index];
    newSpecifications[key] = e.target.value;

    setFormData({ ...formData, specifications: newSpecifications });
  };

  const addSize = () => {
    setFormData({
      ...formData,
      sizes: [...formData.sizes, size],
    });
    setSize("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("cardImage", cardImage);

    Object.keys(formData).forEach((key) => {
      if (key === "specifications" || key === "sizes") {
        data.append(key, JSON.stringify(formData[key]));
      } else if (key === "highlights") {
        data.append(key, JSON.stringify(formData[key]));
      } else if (key === "variants") {
        // Serialize the processed variants array
        data.append(key, JSON.stringify(formData[key]));
      } else if (key === "delivery") {
        data.append(`${key}[estimatedDays]`, formData.delivery.estimatedDays);
        data.append(`${key}[cost]`, formData.delivery.cost);
      } else if (key === "offerPrice") {
        data.append(`offerPrice`, calculateOfferPrice());
      } else if (key === "subSubcategoryId") {
        data.append(`subSubcategoryId`, selectedSubsubcategory);
      } else if (key === "images") {
        colors.forEach((color, index) => {
          data.append(`colors[${index}][colorName]`, color.colorName);
          data.append(`colors[${index}][hexCode]`, color.hexCode);
          color.images.forEach((image) => {
            data.append(`colors[${index}][images]`, image);
          });
        });
      } else {
        data.append(key, formData[key]);
      }
    });

    setAddProduct(data);

    addProductData();
  };

  return (
    <div className="container mx-auto p-5 max-h-[640px] overflow-y-auto bg-stone-200 rounded-lg pb-4 px-6 dark:bg-neutral-800">
      <h2 className="text-3xl font-semibold text-gray-800 mb-10 text-center">
        Create a New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <select
            name=""
            id="category"
            className="w-full px-5 py-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-black"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>
              -- Select a category --
            </option>
            {categories.map((category, index) => {
              return (
                <option key={index} value={category._id}>
                  {category.title}
                </option>
              );
            })}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <select
            name=""
            id="subcategory"
            className="w-full px-5 py-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-black"
            value={selectedSubCategory}
            onChange={(e) => setselectedSubCategory(e.target.value)}
          >
            <option value="" disabled>
              -- Select a Subcategory --
            </option>

            {subcategoryMatch.map((subcategory, index) => {
              return (
                <option key={index} value={subcategory._id}>
                  {subcategory.title}
                </option>
              );
            })}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <select
            name=""
            id="subcategory"
            className="w-full px-5 py-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-black"
            value={selectedSubsubcategory}
            onChange={(e) => setSelectedSubsubcategory(e.target.value)}
          >
            <option value="" disabled>
              -- Select a Subsubcategory --
            </option>

            {subSubcategoryMatch.map((subSubcategory, index) => {
              return (
                <option key={index} value={subSubcategory._id}>
                  {subSubcategory.title}
                </option>
              );
            })}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="title"
            onChange={handleChange}
            placeholder="Product Title"
            required
            className="w-full px-5 py-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-black"
          />
          <input
            name="brand"
            onChange={handleChange}
            placeholder="Brand Name"
          
            className="w-full px-5 py-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-black"
          />
          <input
            name="seller"
            onChange={handleChange}
            placeholder="Seller Name"
            required
            className="w-full px-5 py-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-black"
          />
          <input
            name="price"
            onChange={handleChange}
            placeholder="Product Price"
            type="number"
            className="w-full px-5 py-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-black"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="offerPrice"
            onChange={handleChange}
            value={calculateOfferPrice()}
            disabled
            placeholder="Offer Price"
            type="number"
            readOnly
            className="w-full px-5 py-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-black"
          />
          <input
            name="discountPercentage"
            onChange={handleChange}
            placeholder="Discount %"
            type="number"
            className="w-full px-5 py-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-black"
          />
          <input
            name="stock"
            onChange={handleChange}
            placeholder="Stock Quantity"
            type="number"
            required
            className="w-full px-5 py-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-black"
          />
          <input
            name="subSubcategoryId"
            value={selectedSubsubcategory}
            onChange={handleChange}
            placeholder="Sub-Subcategory ID or Sub-Subcategory Title "
            disabled
            readOnly
            required
            className="w-full px-5 py-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-black"
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-700">
            Product Highlights
          </h4>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Highlights Key"
              value={highlightsKey}
              onChange={(e) => setHighlightsKey(e.target.value)}
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
            />
            <input
              type="text"
              placeholder="Highlights Value"
              value={highlightsValue}
              onChange={(e) => setHighlightsValue(e.target.value)}
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
            />
          </div>
          <button
            onClick={AddHighlights}
            className="px-5 py-2 mt-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 shadow-md"
          >
            Add Highlight
          </button>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-700">About</h4>
          <input
            type="text"
            className="w-full px-5 py-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-black"
            placeholder="Enter about details"
            value={aboutList} // Bind input value to state
            onChange={(e) => setAboutList(e.target.value)} // Update state on input change
          />
          <button
            onClick={handleAddAbout} // Pass function reference
            className="px-5 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 shadow-md"
          >
            Add About
          </button>
          {/* Display the about list */}
          <ul className="mt-4">
            {formData.about.map((item, index) => (
              <li key={index} className="text-gray-800 ">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Product Description"
          className="w-full px-5 py-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-black"
        />

        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-700">Variants</h4>

          {formData.variants.map((variant, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-4 items-center border-b pb-2"
            >
              <input
                type="text"
                value={variant.ram}
                onChange={(e) =>
                  handleVariantChange(index, "ram", e.target.value)
                }
                placeholder="RAM (e.g., 4GB)"
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                value={variant.storage}
                onChange={(e) =>
                  handleVariantChange(index, "storage", e.target.value)
                }
                placeholder="Storage (e.g., 128GB)"
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="number"
                value={variant.price}
                onChange={(e) =>
                  handleVariantChange(index, "price", e.target.value)
                }
                placeholder="Price"
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="number"
                value={variant.offerPrice}
                onChange={(e) =>
                  handleVariantChange(index, "offerPrice", e.target.value)
                }
                placeholder="Offer Price"
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="number"
                value={variant.discountPercentage}
                onChange={(e) =>
                  handleVariantChange(
                    index,
                    "discountPercentage",
                    e.target.value
                  )
                }
                placeholder="Discount (%)"
                className="w-full px-4 py-2 border rounded-md"
              />
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="text-red-500 font-bold"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addVariant}
            className="px-4 py-2 bg-purple-500 text-white rounded-md"
          >
            Add Variant
          </button>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-700">Specifications</h4>
          <div className="flex gap-4">
            <input
              placeholder="Specification Key"
              value={specKey}
              onChange={(e) => setSpecKey(e.target.value)}
              className="w-1/2 px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-black"
            />
            <input
              placeholder="Specification Value"
              value={specValue}
              onChange={(e) => setSpecValue(e.target.value)}
              className="w-1/2 px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-black"
            />
          </div>
          <button
            type="button"
            onClick={addSpecification}
            className="px-5 py-2 mt-2 bg-purple-500  rounded-lg hover:bg-purple-600 shadow-md text-black"
          >
            Add Specification
          </button>
          <div className="p-4">
            {Object.entries(formData.specifications).map(
              ([key, value], index) => (
                <div
                  key={index}
                  className="bg-gray-100 border border-gray-300 rounded-lg p-3 mb-2 shadow-sm"
                >
                  <div className="flex items-center space-x-2">
                    {/* Editable key */}
                    <input
                      type="text"
                      className="text-sm text-gray-700 bg-transparent border-b border-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-150 rounded-none"
                      value={key}
                      onChange={(e) => handleSpecificationKeyChange(e, index)}
                      placeholder="Specification Key"
                    />
                    <span className="text-gray-400">:</span>
                    {/* Editable value */}
                    <input
                      type="text"
                      className="text-sm text-gray-900 bg-transparent border-b border-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-150 rounded-none"
                      value={value}
                      onChange={(e) => handleSpecificationValueChange(e, index)}
                      placeholder="Specification Value"
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-700">
            Sizes (for Fashion)
          </h4>
          <div className="flex gap-4">
            <input
              placeholder="Size (e.g., Small, Medium)"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-black"
            />
            <button
              type="button"
              onClick={addSize}
              className="px-5 py-2 bg-purple-500  rounded-lg hover:bg-purple-600 shadow-md text-black"
            >
              Add Size
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="warranty"
            onChange={handleChange}
            placeholder="Warranty (optional)"
            className="w-full px-5 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-black"
          />
          <input
            type="number" // Set type to "number" for numeric input
            name="rating"
            onChange={handleChange}
            placeholder="Rating (0 - 5)"
            className="w-full px-5 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-black"
            min={0}
            max={5}
            step={0.1} // Optional: allows decimal values like 4.5
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="delivery.estimatedDays"
            onChange={(e) =>
              setFormData({
                ...formData,
                delivery: {
                  ...formData.delivery,
                  estimatedDays: e.target.value,
                },
              })
            }
            placeholder="Estimated Delivery Days"
            type="number"
            className="w-full px-5 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-black"
          />
          <input
            name="delivery.cost"
            onChange={(e) =>
              setFormData({
                ...formData,
                delivery: { ...formData.delivery, cost: e.target.value },
              })
            }
            placeholder="Delivery Cost"
            type="number"
            className="w-full px-5 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-black"
          />
        </div>

        <div className="form-field">
          <label
            htmlFor="image"
            className="form-label block text-lg font-medium text-gray-700 mb-2"
          >
            Product Card View Image
          </label>
          <input
            type="file"
            name="cardImage "
            id="image"
            accept="image/*" // Accept only image files
            onChange={handleImageChange}
            className="w-full p-2 border border-black rounded-lg"
          />
          {imagePreview && (
            <div className="mt-4 flex justify-center">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="rounded-lg border w-full max-w-xs h-auto"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-xl text-slate-700">Colors & Images</h3>
          {colors.map((color, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                value={color.colorName}
                onChange={(e) =>
                  handleColorChange(index, "colorName", e.target.value)
                }
                placeholder="Color Name (e.g., Red)"
                className="w-full px-4 py-2 border rounded-lg bg-white text-black border-black"
              />
              <input
                type="text"
                value={color.hexCode}
                onChange={(e) =>
                  handleColorChange(index, "hexCode", e.target.value)
                }
                placeholder="Hex Code (e.g., #FF0000)"
                className="w-full px-4 py-2 border rounded-lg bg-white  border-black"
              />
              {/* Image upload for the color */}
              <input
                type="file"
                multiple
                onChange={(e) => handleImageChangeForColor(index, e)}
                className="w-full px-4 py-2 border rounded-lg  border-black"
              />

              {/* Display image previews */}
              <div className="flex space-x-2">
                {color.images &&
                  Array.from(color.images).map((image, imgIndex) => (
                    <div>
                      <img
                        key={imgIndex}
                        src={URL.createObjectURL(image)}
                        alt={`Color ${color.colorName} image`}
                        className="w-20 h-20 object-cover text-black"
                      />
                      <button
                        className="text-black border p-3 mt-3 rounded-2xl bg-stone-200 "
                        onClick={() => removeImg(index, imgIndex)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
              </div>
              <button
                type="button"
                onClick={() => removeColor(index)}
                className=" border-black bg-red-700 text-white p-2 rounded-lg"
              >
                Remove Color
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addColor}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Add Color
        </button>

        <button
          type="submit"
          className="w-full py-3 mt-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-indigo-600 shadow-lg"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
