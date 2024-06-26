import DefaultLayout from '../layout/DefaultLayout';
import CoverOne from '../images/cover/cover2.jpg';
// import userSix from '../images/user/user-06.png';

import { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState<any>(null); // Initialize user state

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user state from localStorage
    }
  }, []);

  return (
    <DefaultLayout>
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto shadow-6 -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <span className="h-12 w-12 overflow-hidden">
              <img style={{ borderRadius: '50%', objectFit: 'cover', width: '100%', height: '100%' }} src={user && user.user_image} alt="User" />
            </span>


          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {user && user.user_name}
            </h3>
            <p className="font-medium">{user && user.user_type}</p>
            {/* Additional profile information */}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
