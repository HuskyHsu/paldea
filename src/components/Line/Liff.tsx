import { useEffect, useState } from 'react';
import liff from '@line/liff';

type Profile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
};

export function useLiff() {
  const [data, setData] = useState({
    isInClient: false,
    os: 'ios',
    isInAppBrowser: false,
    isLoggedIn: false,
  });
  const [profile, setProfile] = useState<Profile>({} as Profile);

  const liffInit = async () => {
    try {
      await liff.init({ liffId: '1654570736-JRAEqoWN' });
      const { userAgent } = navigator;
      setData({
        isInClient: liff.isInClient(),
        isLoggedIn: liff.isLoggedIn(),
        os: liff.getOS() as string,
        isInAppBrowser: !liff.isInClient() && userAgent.includes('Line'),
      });
      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        setProfile(profile);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    liffInit();
  }, []);

  const logout = () => {
    liff.logout();
  };

  const login = () => {
    liff.login();
  };

  const share = async (message: { type: string; text: string }[]) => {
    await liff.shareTargetPicker([
      {
        type: 'text',
        text: 'Hello World!',
      },
    ]);
  };

  //   const renderLoginButton = () => {
  //     if (data.isLoggedIn) {
  //       return (
  //         <button data-testid="logout" onClick={logout}>
  //           Logout
  //         </button>
  //       );
  //     }
  //     return (
  //       <button data-testid="login" onClick={login}>
  //         Login
  //       </button>
  //     );
  //   };

  return {
    logout,
    login,
    profile,
    data,
    share,
  };
}
