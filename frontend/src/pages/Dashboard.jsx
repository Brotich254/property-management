import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { propertyAPI } from '../api'
import Navbar from '../components/Navbar'

export default function Dashboard() {
  const { user } = useAuth()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    monthlyRent: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    description: ''
  })

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const response = await propertyAPI.getAll()
      setProperties(response.data)
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await propertyAPI.create(formData)
      setFormData({
        address: '', city: '', state: '', zipCode: '', monthlyRent: '',
        bedrooms: '', bathrooms: '', squareFeet: '', description: ''
      })
      setShowModal(false)
      fetchProperties()
    } catch (error) {
      console.error('Error creating property:', error)
    }
  }

  if (loading) return <div className="text-center py-12">Loading...</div>

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Properties</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Property
          </button>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded">
            <p className="text-gray-500">No properties yet. Create your first property!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2">{property.address}</h3>
                <p className="text-gray-600 mb-4">{property.city}, {property.state}</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                  <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
                  <p><strong>Rent:</strong> ${property.monthlyRent}</p>
                  <p><strong>Size:</strong> {property.squareFeet} sq ft</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-screen overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Add New Property</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="number"
                  name="bedrooms"
                  placeholder="Bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="number"
                  name="bathrooms"
                  placeholder="Bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="number"
                  name="squareFeet"
                  placeholder="Square Feet"
                  value={formData.squareFeet}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="number"
                  name="monthlyRent"
                  placeholder="Monthly Rent"
                  value={formData.monthlyRent}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  rows="3"
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
