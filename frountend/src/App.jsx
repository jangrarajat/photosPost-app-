import { useEffect, useState } from 'react'
import { HiPlus } from "react-icons/hi";
import { BsCloudUploadFill } from "react-icons/bs";

import { CiCircleRemove } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";



import './App.css'

import axios from 'axios';



function App() {
  const [searchBar, setSearchBar] = useState(false)
  const [upLaodPhotoLoading, setUpLaodPhotoLoading] = useState(false)
  const [postDiv, setPostDiv] = useState(false)
  const [imageUrl, setImageUrl] = useState("");
  const [genrateUrlLoading, setGenrateUrlLoading] = useState(false)
  const [sucMsg, setSucMsg] = useState(false)
  const [title, setTitle] = useState("add title")
  const [allData, setAllData] = useState()
  const [searchkey, setSearchkey] = useState("")





  //  get only searched data 

  const searchedData = async () => {
    if (!searchkey) return "searchkey is empty"
    
    try {
      const res = await axios.get(`http://localhost:3000/api/photos?q=${encodeURIComponent(searchkey)}`)
      // const newRes = await res.json();
  
      
    if(res.data.message.length !==0 ){
      const myAllPostes = res.data.message.length === 1 ? (
        <div className="w-full">
          {res.data.message.map((post) => (
            <div key={post._id} className=' w-fit   rounded-lg'>
              <img
                src={post.photo}
                className="rounded-xl w-full "
                alt="postes"
              />
              <div><p className='text-white font-extralight'>{post.title}</p></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="columns-3 md:columns-9 gap-4">
          {res.data.message.map((post) => (
            <div key={post._id} className="mb-2 break-inside-avoid   rounded-lg">
              <img
                src={post.photo}
                className="w-full rounded-lg"
                alt="postes"
              />
            </div>
          ))}
        </div>
      );

      setAllData(myAllPostes)

     

    }
      
    } catch (error) {
      console.log("serch daata  get error", error.message)
      console.log(searchkey)
    }
  }



  //  get all data from mongoDb 

  const getData = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/user')
      const data = await res.json();

      const myAllPostes = data.length === 1 ? (
        <div className="w-full">
          {data.map((post) => (
            <div key={post._id} className=' w-fit   rounded-lg'>
              <img
                src={post.photo}
                className="rounded-xl w-full "
                alt="postes"
              />
              <div><p className='text-white font-extralight'>{post.title}</p></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="columns-3 md:columns-9 gap-4">
          {data.map((post) => (
            <div key={post._id} className="mb-2 break-inside-avoid   rounded-lg">
              <img
                src={post.photo}
                className="w-full rounded-lg"
                alt="postes"
              />
            </div>
          ))}
        </div>
      );
      setAllData(myAllPostes)

    } catch (error) {
      console.log("  get all data error", error.message)
      console.log(searchkey)
    }

  }


  //  post new photo 


  const postNewPhoto = async () => {

    try {

      const res = await axios.post('http://localhost:3000/api/user', {
        title: title,
        photo: imageUrl,
      })
      setUpLaodPhotoLoading(false)
      getData();
      setPostDiv(false)
      console.log("photo uplodaed", res.data);
    } catch (error) {
      console.log(error.message)
      setUpLaodPhotoLoading(false)
    }
  }



  // delete photo 

  const deletePhoto = async (id, title, photo) => {
    console.log(id)
    console.log(title)
    console.log(photo)
    try {
      const res = await axios.delete(`http://localhost:3000/api/user/${id}`, {
        data: {
          title: title,
          photo: photo,
        },
      })
      getData();
      const deleteRes = await res.json()
      console.log(deleteRes)
    } catch (error) {
      console.log("delete error", error.message)
    }
  }





  // genrating image url 

  function successMessage() {
    setSucMsg(true)

    setTimeout(() => {
      setSucMsg(false)
    }, 1200)

  }


  // upload new post 

  const upLaodPhoto = async (e) => {

    const files = e.target.files;
    if (!files || files.length === 0) {
      console.log("No file selected.");
      return;
    }

    const file = files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "rajat_jangra");

    try {
      setGenrateUrlLoading(true)
      const response = await fetch("https://api.cloudinary.com/v1_1/drrj8rl9n/image/upload", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      setImageUrl(data.secure_url);
      setGenrateUrlLoading(false)
      successMessage()
  
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };


  useEffect(() => {
    console.log(imageUrl)
    getData()
  }, [imageUrl])




  function hideserchbar() {
    searchedData()
    setSearchBar(false)
    setPostDiv(false)
  }

  function homeBtn() {
    getData()
    hideserchbar()
    setSearchBar(false)
    setPostDiv(false)
  }





  return (
    <>


      {sucMsg ? (
        <>
          <div className='p-2 px-8 fixed top-4 left-4 transform -translate-x-1/2 -translate-y-1/2   bg-green-400     z-50  rounded-xl animate-slideBounceFade '>
            <p className='text-white'>Success</p>
          </div>
        </>)
        : (<>
        </>)}





      {/* navbar  */}
      <div className=' justify-between items-center p-3 w-[90%] mx-auto rounded-b-md flex gap-3 fixed ml-[5%] z-40 backdrop-blur-sm bg-white/40'>

        <div className="  z-20  rounded-[10px] w-fit   flex flex-col items-center  justify-around md:justify-center md:gap-4   text-white  font-bold">
          <div className='flex  flex-row items-center'>
            <img src="https://res.cloudinary.com/drrj8rl9n/image/upload/v1754624015/ybpwgwjjksdsebgon2co.jpg" className='w-11 rounded-full p-1' alt="logo" />
          </div>
        </div>
        <div className='flex'>

          <div

            className='gap-7 p-3 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center px-3 rounded-full text-white'>
            <FaHome className=' cursor-pointer' onClick={homeBtn} />
            <FaSearch className={searchBar ? "animate-bounce" : "animate-none"} onClick={() => searchBar ? setSearchBar(false) : setSearchBar(true)} />
            <HiPlus className={postDiv ? "animate-bounce cursor-pointer" : "animate-none cursor-pointer"} onClick={() => postDiv ? setPostDiv(false) : setPostDiv(true)} />

          </div>
        </div>

        <div className=' flex items-center px-3 rounded-full text-white'>

          <button className='p-2 flex items-center '>
            <CiLogin />
            Login
          </button>
        </div>

      </div>



      {/* search bar  start */}


      {searchBar ? (<>
        <div className=' text-white p-4 rounded-xl w-[90%] md:w-[70%] backdrop-blur-sm z-40  fixed top-[10%] left-1/2 transform -translate-x-1/2 '>

          <input
            onChange={(e) => setSearchkey(e.target.value)}
            type="text" placeholder='Search your think' className=' font-extralight  px-4 mt-10 w-full flex flex-col bg-white/30  h-12 rounded-md ' />
          <button
            onClick={hideserchbar}
            className=' w-full rounded-lg mt-5 p-2 bg-white/40 flex  items-center justify-center text-gray-600'
          >
            <FaSearch />
            search
          </button>

        </div>
      </>) : (<></>)}

      {/* search bar  end */}






      {/* uplod new photo section  */}

      {postDiv ? (<>
        <div className='  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-[20px]  bg-gradient-to-r from-purple-500 to-pink-500 z-20  w-fit ' >
          <div><CiCircleRemove onClick={() => postDiv ? setPostDiv(false) : setPostDiv(true)} className=' cursor-pointer text-white' /></div>
          <div className="flex flex-col items-center justify-center w-full mt-3" >
            <label
              htmlFor="fileupload"
              className="  flex flex-col items-center justify-center w-full max-w-sm h-20 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 transition"
            >

              <h2 className='flex flex-col items-center gap-2 '
              >
                {genrateUrlLoading ? (
                  <>
                    <div className='flex flex-col justify-center items-center text-white'>
                      <div className='h-10 w-10 border-[5px] border-green-100 border-b-blue-500 animate-spin  rounded-full'></div>
                      <p className='font-extralight text-white'>genrating image url</p>
                    </div>
                  </>) : (
                  <>
                    <p className='font-extralight text-white'>Select Image </p>
                    <BsCloudUploadFill className='text-white' />
                  </>)}
              </h2>

              <input id="fileupload" type="file" accept="image/*" onChange={upLaodPhoto} className="hidden" />
            </label>

            <label
              htmlFor="title"
              className="   w-full max-w-sm mt-3  rounded-lg cursor-pointer"
            >

              <input type="text" id='title' placeholder='Enter title'
                onChange={(e) => setTitle(e.target.value)}
                className='h-10 w-full font-thin mt-4 px-2 rounded-lg  bg-gray-700 text-white'
              />


            </label>

          </div>
          <br />
          <br />
          <button
            onClick={() => {
              postNewPhoto()
              setUpLaodPhotoLoading(true)
            }}
            className='flex flex-row gap-5 justify-center items-center mt-3 bg-green-500 w-80 rounded-lg p-2 md:bg-green-400'
          >
            {upLaodPhotoLoading ? (
              <>
                <div className='h-10 w-10  rounded-full border-4 border-white border-b-gray-400 animate-spin'>
                </div>
                <p className='font-extralight'>uplaoding pic...</p>
              </>) : (<><p className='font-extralight text-white'> upload photo</p></>)}

          </button>
        </div>

      </>) : (<></>)}






      {/* photos section  */}

      <div className=' flex flex-row flex-wrap   absolute  p-5 '   >
        {allData}
      </div>







    </>
  )
}

export default App




