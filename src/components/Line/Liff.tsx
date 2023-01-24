import { useEffect, useState } from 'react';
import liff from '@line/liff';

type Profile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
};

export function Liff() {
  const [message, setMessage] = useState('');
  const [data, setData] = useState({
    isInClient: false,
    os: 'ios',
    isInAppBrowser: false,
    isLoggedIn: false,
  });
  const [profile, setProfile] = useState<Profile>({} as Profile);
  const [error, setError] = useState('');

  const liffInit = async () => {
    try {
      await liff.init({ liffId: '1654570736-JRAEqoWN' });
      setMessage('LIFF init succeeded.');
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
        // window.location.href = window.location.href.replace(window.location.search, '');
      }
    } catch (error) {
      setMessage('LIFF init failed.');
      setError(`${error}`);
    }
  };

  useEffect(() => {
    liffInit();
  }, [message]);

  const logout = () => {
    liff.logout();
  };

  const login = () => {
    liff.login();
  };

  const share = async () => {
    await liff.shareTargetPicker([
      {
        type: 'text',
        text: 'Hello World!',
      },
    ]);
  };

  const renderLoginButton = () => {
    if (data.isLoggedIn) {
      return (
        <button data-testid="logout" onClick={logout}>
          Logout
        </button>
      );
    }
    return (
      <button data-testid="login" onClick={login}>
        Login
      </button>
    );
  };

  return (
    <div className="App">
      <h1>liff 測試</h1>
      {message && <p>{message}</p>}
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
      {data && (
        <div>
          <p data-testid="isLoggedIn">liff.isLoggedIn: {String(data.isLoggedIn)}</p>
          {renderLoginButton()}
        </div>
      )}
      {data && data.isLoggedIn && (
        <div className="profile">
          <img src={profile.pictureUrl} width="200" alt="profileUrl" loading="lazy" />
          <p data-testid="userId">userId: {profile.userId}</p>
          <p data-testid="displayName">displayName: {profile.displayName}</p>
          <button data-testid="logout" onClick={share}>
            share
          </button>
        </div>
      )}
    </div>
  );
}
