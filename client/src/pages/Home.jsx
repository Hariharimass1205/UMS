import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyJWT } from '../utils/apiCall';
import Loading from '../components/LoadingPage.jsx';
import Navbar from '../components/Navbar.jsx';
import { toast } from 'sonner';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from '../utils/userSlice.js';
import { uploadImagesToFireStore } from '../utils/firestore.js';
import Swal from 'sweetalert2';

function Home() {
  const dispatch = useDispatch();
  const userDetails = useSelector((store) => store.user.userDetails);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const isLoggedIn = await verifyJWT();
        if (!isLoggedIn) {
          navigate('/');
        }
      } catch (error) {
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (userDetails) {
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
    }
  }, [userDetails]);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      dispatch(setUserDetails(JSON.parse(storedUserDetails)));
    }
  }, []);

  if (isLoading) return <Loading />;

  const handleLogout = () => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out of the application.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, log out!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
        confirmButtonColor: '#d33',  // Red color for the confirm button
        cancelButtonColor: '#3085d6',  // Default blue for the cancel button
      }).then((result) => {
        if (result.isConfirmed) {
          document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          sessionStorage.clear();
          localStorage.clear();
          dispatch(setUserDetails(null));
          toast.success("Logged out successfully!", {
            autoClose: 3000,
          });
          navigate('/');
        }
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const uploadImage = async () => {
    try {
      if (!image) {
        toast.error("Select an image to upload", {
          autoClose: 3000,
        });
      } else {
        const imageUrl = await uploadImagesToFireStore(image, userDetails._id);
        dispatch(setUserDetails({ ...userDetails, url: imageUrl }));
        localStorage.setItem('userDetails', JSON.stringify({ ...userDetails, url: imageUrl }));
        setImage(imageUrl);
        toast.success("Image uploaded successfully!", {
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar></Navbar>
      <br />
      <h1 className="flex items-center justify-center text-3xl font-bold text-gray-100 mb-2">Welcome to Home page</h1>
      <hr />
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-6xl mx-auto mt-8 h-96 flex flex-col md:flex-row">
        <div className="flex-shrink-0 w-full md:w-1/3 flex items-center justify-center mb-4 md:mb-0">
          <div className="flex flex-col items-center">
            <img
              src={userDetails.url}
              id="profile-img"
              alt="Upload Profile pic"
              className="w-40 h-100 rounded-full border-4 border-gray-700"
            />
            <br />
            <input
              type="file"
              accept="image/*"
              className="mb-2 text-gray-300"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const imgElement = document.getElementById('profile-img');
                  imgElement.src = URL.createObjectURL(file);
                  setImage(file);
                }
              }}
            />
            <br />
            <button
              onClick={uploadImage}
              className="w-30 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Upload Image
            </button>
          </div>
        </div>
        <div className="w-full md:w-2/3 flex flex-col justify-center pl-0 md:pl-6">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Name: {userDetails.username}</h1>
          <p className="text-gray-400 mb-4">Email: {userDetails.email}</p>
          <p className="text-gray-400 mb-4">Phone: {userDetails.phone}</p>
          <button
            onClick={handleLogout}
            className="w-96 bg-gradient-to-r from-red-700 to-red-500 hover:from-red-800 hover:to-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
