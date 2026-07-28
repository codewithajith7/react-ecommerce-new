import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./Wishlist.css";
import { FaTrash } from "react-icons/fa";


const Wishlist = () => {

  const [wish, setWish] = useState([]);

  const user = JSON.parse(localStorage.getItem("user")) || null;
  const userId = user?.id;


  // Add your Supabase anon key here
  const API_KEY = "YOUR_SUPABASE_API_KEY";



  // Fetch Wishlist Items
  const fetchWishlist = useCallback(async () => {

    try {

      const res = await axios.get(

        `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/wishlist?user_id=eq.${userId}&select=*,products(*)`,

        {
          headers: {
                    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                    "Content-Type": "application/json",
                    Prefer: "return=representation",
                }

        }

      );


      console.log("Wishlist Data:", res.data);

      setWish(res.data);


    } catch (err) {

      console.log("Something went wrong:", err);

    }


  }, [userId]);




  useEffect(() => {

    if (userId) {

      fetchWishlist();

    }

  }, [userId, fetchWishlist]);





  // Delete Wishlist Item
  const handleWishDelete = async (item) => {

    try {


      await axios.delete(

        `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/wishlist?id=eq.${item.id}`,

        {
           headers : {
                    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                   
                }
           
                }


        

      );



      // Remove from UI immediately

      setWish((prev) =>

        prev.filter(

          (wishlistItem) => wishlistItem.id !== item.id

        )

      );


      alert("Removed from wishlist");



    } catch (err) {

      console.log("Delete failed:", err);

      alert("Failed to remove item");

    }

  };





  return (

    <div className="wishlist-container">


      <h1>My Wishlist ❤️</h1>



      {wish.length === 0 ? (

        <h2 className="empty-wishlist">
          Your wishlist is empty
        </h2>

      ) : (


        <div className="wishlist-grid">


          {wish.map((item) => (


            <div
              className="wishlist-card"
              key={item.id}
            >



              <button

                className="delete-btn"

                onClick={() => handleWishDelete(item)}

                title="Remove from wishlist"

              >

                <FaTrash />

              </button>




              <img

                src={item.products?.image}

                alt={item.products?.title}

              />



              <h3>

                {item.products?.title}

              </h3>




              <p>

                Price: ₹{item.products?.price}

              </p>



            </div>


          ))}



        </div>


      )}



    </div>

  );

};


export default Wishlist;