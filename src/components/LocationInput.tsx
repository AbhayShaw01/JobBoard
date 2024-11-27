import { forwardRef, useMemo, useState } from "react"
import { Input } from "./ui/input"
import citiesList from "@/lib/cities-list"
import { count } from "console"

interface LocationInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    onLocationSelected:(location:string)=>void
}
export default forwardRef<HTMLInputElement,LocationInputProps> (function LocationInput({onLocationSelected,...props},ref){
const [locationSearchInput,setLocationSearchInput]=useState("")
const [hasFocus,setFocus]=useState(false);

const cities = useMemo(() => {
    if (!locationSearchInput.trim()) return [];

    const searchWords = locationSearchInput.split(" ");

    return citiesList
      .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
      .filter(
        (city) =>
          city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
          searchWords.every((word) =>
            city.toLowerCase().includes(word.toLowerCase()),
          ),
      )
      .slice(0, 5);
  }, [locationSearchInput]);



return <div>
    <Input placeholder="Search for a city"
    type="search"
    onChange={(e)=>setLocationSearchInput(e.target.value)}
    onFocus={()=>setFocus(true)}
    onBlur={()=>setFocus(false)}
     {...props} ref={ref} value={locationSearchInput} />
    <div>
        {locationSearchInput.trim() && hasFocus && (
            <div>
                {cities.length && <p className="p-3">
                    No results found</p>}
                    {cities.map(city=>(
                        <button onMouseDown={(e)=>{
                            e.preventDefault()
                            onLocationSelected(city)
                            setLocationSearchInput("")

                        }} key={city} className="block w-full text-start p-2">
                            {city}
                        </button>
                    ))}
            </div>
        )}
    </div>
</div>
})