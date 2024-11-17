import { useState } from 'react';

const RecipeFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    dietaryRestrictions: [],
    cookingTime: 'any',
    mealType: 'any'
  });

  const dietaryOptions = [
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Vegan', value: 'vegan' },
    { label: 'Gluten-Free', value: 'gluten-free' }
  ];

  const cookingTimeOptions = [
    { label: 'Any Time', value: 'any' },
    { label: 'Under 30 mins', value: '30' },
    { label: 'Under 1 hour', value: '60' }
  ];

  const mealTypeOptions = [
    { label: 'Any Type', value: 'any' },
    { label: 'Breakfast', value: 'breakfast' },
    { label: 'Lunch', value: 'lunch' },
    { label: 'Dinner', value: 'dinner' },
    { label: 'Snack', value: 'snack' }
  ];

  const handleDietaryChange = (value) => {
    const updatedDietary = filters.dietaryRestrictions.includes(value)
      ? filters.dietaryRestrictions.filter(item => item !== value)
      : [...filters.dietaryRestrictions, value];
    
    const newFilters = {
      ...filters,
      dietaryRestrictions: updatedDietary
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSelectChange = (type, value) => {
    const newFilters = {
      ...filters,
      [type]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-2">Dietary Restrictions</h3>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleDietaryChange(option.value)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.dietaryRestrictions.includes(option.value)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Cooking Time</h3>
          <select
            value={filters.cookingTime}
            onChange={(e) => handleSelectChange('cookingTime', e.target.value)}
            className="select select-bordered w-full max-w-xs text-sm"
          >
            {cookingTimeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Meal Type</h3>
          <select
            value={filters.mealType}
            onChange={(e) => handleSelectChange('mealType', e.target.value)}
            className="select select-bordered w-full max-w-xs text-sm"
          >
            {mealTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default RecipeFilters;
