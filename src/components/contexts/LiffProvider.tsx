import { createContext, useContext, useState, PropsWithChildren, useEffect } from 'react';
import liff from '@line/liff';
import { SendMessagesParams } from '@liff/send-messages';
import { CONFIG } from '@/config';

type Profile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
};

type LiffStatus = {
  isInClient: boolean;
  os: string;
  isInAppBrowser: boolean;
  isLoggedIn: boolean;
};

interface LiffType {
  logout: () => void;
  login: () => void;
  profile: Profile;
  status: LiffStatus;
  share: (messages: SendMessagesParams) => Promise<void>;
}

const LiffContext = createContext<LiffType>({
  logout: () => null,
  login: () => null,
  profile: {} as Profile,
  status: {
    isInClient: false,
    os: 'ios',
    isInAppBrowser: false,
    isLoggedIn: false,
  },
  share: async () => {},
});

export const LiffProvider = ({ children }: PropsWithChildren) => {
  const [status, setStatus] = useState({
    isInClient: false,
    os: 'ios',
    isInAppBrowser: false,
    isLoggedIn: false,
  });
  const [profile, setProfile] = useState<Profile>({} as Profile);

  const liffInit = async () => {
    try {
      await liff.init({ liffId: CONFIG.line.liffId });
      const { userAgent } = navigator;
      setStatus({
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

  const logout = () => {
    liff.logout();
    window.location.reload();
  };

  const login = () => {
    liff.login();
  };

  const share = async (messages: SendMessagesParams) => {
    try {
      await liff.shareTargetPicker(messages);
    } catch (error) {
      if ((error as { code: string }).code === 'EXCEPTION_IN_SUBWINDOW') {
        return alert(
          '請使用外部瀏覽器開啟(share target picker 功能不支援內部瀏覽器，無法正常跳轉)'
        );
      }
      alert(`發生錯誤：${JSON.stringify(error)}`);
    }
  };

  useEffect(() => {
    liffInit();
  }, []);

  return (
    <LiffContext.Provider value={{ logout, login, status, profile, share }}>
      {children}
    </LiffContext.Provider>
  );
};

export const useLiffContext = () => useContext(LiffContext);
