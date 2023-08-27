import Footer from "../../components/navigation/Footer"
import Navbar from "../../components/navigation/Navbar"
import Blog from "../../components/blog/BlogList"
import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { AuthContext } from '../../components/blog/context/context'

function News(){
    const [notifications, setNotifications] = useState([])
	const [countNotifications, setCountNotifications] = useState(0)
	const [isAuth, setIsAuth] = useState(false)
	const [isLoading, setLoading] = useState(true)
	const [selectedImage, setSelectedImage] = useState()
	const [selectedPostFile, setSelectedPostFile] = useState()
	const [selectedFile, setSelectedFile] = useState()
	const [preview, setPreview] = useState()
	const [postPreview, setPostPreview] = useState([])
	const [userInfo, setUserInfo] = useState({
		name: 'Vlad',
		surname: 'Duplinskij',
		avatar: '',
		username: 'Admin',
		status: 'user',
		age: 18,
		email: 'duplinskij_v_d@mail.ru',
		tel: '+7-952-154-57-07',
	})
        return(
            <AuthContext.Provider
			value={{
				isAuth,
				setIsAuth,
				isLoading,
				notifications,
				setNotifications,
				countNotifications,
				setCountNotifications,
				userInfo,
				setUserInfo,
				selectedImage,
				setSelectedImage,
				selectedFile,
				setSelectedFile,
				preview,
				setPreview,
				selectedPostFile,
				setSelectedPostFile,
				postPreview,
				setPostPreview,
			}}>
                
            <div>
                <Navbar/>
                <br/><br/><br/>
                <Blog/>

                <Footer/>
            </div>
            </AuthContext.Provider>
        )
    }
export default News