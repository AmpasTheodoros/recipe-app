import { Search } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import RecipeFilters from "../components/RecipeFilters";
import { useEffect, useState } from "react";
import { getRandomColor } from "../lib/utils";
import { mockRecipes } from "../lib/mockData";

const APP_ID = import.meta.env.VITE_APP_ID;
const APP_KEY = import.meta.env.VITE_APP_KEY;

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    dietaryRestrictions: [],
    cookingTime: 'any',
    mealType: 'any'
  });

  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setRecipes([]);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter mock recipes based on search query
      const filteredRecipes = {
        hits: mockRecipes.hits.filter(({ recipe }) => {
          // Search query filter
          const matchesSearch = recipe.label.toLowerCase().includes(searchQuery.toLowerCase());
          
          // Dietary restrictions filter
          const matchesDietary = activeFilters.dietaryRestrictions.length === 0 || 
            activeFilters.dietaryRestrictions.every(restriction => 
              recipe.healthLabels?.includes(restriction.toUpperCase())
            );
          
          // Cooking time filter
          const matchesCookingTime = activeFilters.cookingTime === 'any' || 
            (recipe.totalTime && recipe.totalTime <= parseInt(activeFilters.cookingTime));
          
          // Meal type filter
          const matchesMealType = activeFilters.mealType === 'any' || 
            recipe.mealType?.includes(activeFilters.mealType);
          
          return matchesSearch && matchesDietary && matchesCookingTime && matchesMealType;
        })
      };
      
      setRecipes(filteredRecipes.hits);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes("chicken");
  }, []);

  const handleSearchRecipe = (e) => {
    e.preventDefault();
    fetchRecipes(e.target[0].value);
  };

  return (
    <div className='bg-[#faf9fb] p-10 flex-1'>
      <div className='max-w-screen-lg mx-auto'>
        <form onSubmit={handleSearchRecipe}>
          <label className='input shadow-md flex items-center gap-2'>
            <Search size={"24"} />
            <input
              type='text'
              className='text-sm md:text-md grow'
              placeholder='What do you want to cook today?'
            />
          </label>
        </form>

        <RecipeFilters onFilterChange={(filters) => {
          setActiveFilters(filters);
          const searchInput = document.querySelector('input[type="text"]');
          fetchRecipes(searchInput.value || 'chicken');
        }} />

        <h1 className='font-bold text-3xl md:text-5xl mt-4'>Recommended Recipes</h1>
        <p className='text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight'>Popular choices</p>

        <div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {!loading &&
            recipes.map(({ recipe }, index) => (
              <RecipeCard key={index} recipe={recipe} {...getRandomColor()} />
            ))}

          {loading &&
            [...Array(9)].map((_, index) => (
              <div key={index} className='flex flex-col gap-4 w-full'>
                <div className='skeleton h-32 w-full'></div>
                <div className='flex justify-between'>
                  <div className='skeleton h-4 w-28'></div>
                  <div className='skeleton h-4 w-24'></div>
                </div>
                <div className='skeleton h-4 w-1/2'></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
